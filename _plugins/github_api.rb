require 'json'
require 'open-uri'
require 'open-uri/cached'

module Jekyll_Get_Github
  class Generator < Jekyll::Generator
    safe true
    priority :highest

    def generate(site)
      site.data['contributors'] = {}
      site.collections['software'].docs.each do |d|
        d.data['github'] = {}
        d.data['github']['releases'] = JSON.load(
          URI("https://api.github.com/repos/#{d['gh_org']}/#{d['name']}/releases").open()
        )
        d.data['github']['repo'] = JSON.load(
          URI("https://api.github.com/repos/#{d['gh_org']}/#{d['name']}").open()
        )
        d.data['github']['contributors'] = JSON.load(
          URI("https://api.github.com/repos/#{d['gh_org']}/#{d['name']}/contributors").open()
        )
        d.data['github']['contributors'].each do |c|
            if site.data['contributors'].key?(c['login'])
                if d.data['github']['repo']['owner']['login'] == "tskit-dev"
                    site.data['contributors'][c['login']]['contributions'] += c['contributions']
                end
            else
                c['repos'] = []
                site.data['contributors'][c['login']] = c
                if d.data['github']['repo']['owner']['login'] != "tskit-dev"
                    site.data['contributors'][c['login']]['contributions'] = 0
                end
            end
            site.data['contributors'][c['login']]['repos'].append(d.data['github']['repo']['name'])
        end
      end
      site.data['contributors'] = site.data['contributors'].values.sort_by {|x| -x['contributions']}
      site.data['contributors'] = site.data['contributors'].filter {|x| !x['login'].include?("[bot]") and x['login'] != "pyup-bot"}
      puts site.data['contributors'][0].inspect
      site.data['contributors'].each do |c|
        c.merge!(JSON.load(URI("https://api.github.com/users/#{c['login']}").open()))
      end
      puts site.data['contributors'][0].inspect
    end
  end
end
