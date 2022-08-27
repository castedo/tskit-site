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
            begin
                p.data["year"] = source["published-online"]["date-parts"][0][0]
            rescue
                p.data["year"] = source["published-print"]["date-parts"][0][0]
            end
            authors = source["author"].map {|x| x["family"]}
            p.data["author"] = authors[0]
            if authors.length > 1 then
                p.data["author"] = "#{authors[0]} et al"
            end
            p.data["url"] = "https://doi.org/#{p.data['doi']}"
        end
      end
    end
  end
end
