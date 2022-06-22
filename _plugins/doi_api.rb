require 'json'
require 'open-uri'
require 'open-uri/cached'

module Jekyll_Get_DOI
  class Generator < Jekyll::Generator
    safe true
    priority :highest

    def generate(site)
      site.collections['resources'].docs.each do |p|
        if p.data['doi'] then
            doc = JSON.load(URI("http://api.crossref.org/works/#{p.data['doi']}").open())
            source = doc["message"]
            p.data["title"] = source["title"]
            p.data["journal"] = source["container-title"]
            p.data["year"] = source["published-online"]["date-parts"][0][0]
            authors = source["author"].map {|x| x["family"]}
            p.data["author"] = authors[0..-2].join(", ") + " and " + authors[-1]
            p.data["url"] = "https://doi.org/#{p.data['doi']}"
        end
      end
    end
  end
end
