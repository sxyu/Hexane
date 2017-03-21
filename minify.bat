set yui="C:\Program Files\YUI\yuicompressor-2.4.8.jar"
set base="D:\Programming\Sites\chem2"
set css="D:\Programming\Sites\chem2\css"
set js="D:\Programming\Sites\chem2\js"

cd %css%

type fonts\embed.css normalize.css ..\mathquill-0.10.1\mathquill.css main.css > production.temp.css
java -jar %yui% production.temp.css > production.css
del production.temp.css

cd %js%

type jquery-1.12.4.min.js spin.js signum.js ..\mathquill-0.10.1\mathquill.js main.js hexane.eval.signum.js  > production.temp.js
java -jar %yui% production.temp.js > production.js
del production.temp.js

cd %base%