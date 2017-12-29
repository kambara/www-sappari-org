require 'iconv'

def euctou8 (str)
  iconv = Iconv.new("UTF-8", "EUC-JP")
  iconv.iconv(str)
end

def google (query)
  url = sprintf("http://www.google.co.jp/search?ie=UTF-8&oe=UTF-8&q=%s",
                euctou8(query).escape)
  sprintf("<a href='%s'>%s</a>", url, query)
end

def google_with_title (title, query)
  url = sprintf("http://www.google.co.jp/search?ie=UTF-8&oe=UTF-8&q=%s",
                euctou8(query).escape)
  sprintf("<a href='%s'>%s</a>", url, title.escapeHTML)
end
