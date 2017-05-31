set yui="C:\Program Files\YUI\yuicompressor-2.4.8.jar"
set base="D:\Programming\Sites\hexane"
set css="D:\Programming\Sites\hexane\css"

cd %css%

type fonts\embed.css normalize.css ..\mathquill-0.10.1\mathquill.css main.css > production.temp.css
java -jar %yui% production.temp.css > production.css
del production.temp.css

cd %base%
