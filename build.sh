#!/bin/bash

mkdir BuildZips > /dev/null
mkdir zip_folder > /dev/null

if [ "$1" = "debug" ]; then
	packagemode="debug"
else
	packagemode="release"
fi

versionCode=$((`cat versionCode.txt` + 1))
version=`cat version.txt`
zipfile="`pwd`/BuildZips/DIGI-WebApp_homework_"$version"."$versionCode"_"$packagemode".zip"

config_xml="$packagemode"_config.xml
config_json="$packagemode"_config.json

sed "s/@versionCode@/$versionCode/g" $config_json > config.json
sed "s/@versionCode@/$versionCode/g" $config_xml > config.xml

sed "s/@version@/$version/g" -i config.json
sed "s/@version@/$version/g" -i config.xml

sed "s/@versionCode@/$versionCode/g" app/views/InfoPage.js.template > app/views/InfoPage.js
sed "s/@versionCode@/$versionCode/g" app/controllers/RequestController.js.template > app/controllers/RequestController.js
sed "s/@version@/$version/g" -i app/views/InfoPage.js
sed "s/@version@/$version/g" -i app/controllers/RequestController.js

rm build/* -rf
rm zip_folder/* -rf

espresso build
rm build/* -rf
espresso deploy
#rm build/* -rf
#espresso build

cp -r build/*/* zip_folder/
#rm ~/devel/DIGI-WebApp/*
cp -r build/*/* ~/devel/DIGI-WebApp/
cp config.xml zip_folder/
cp config.xml ~/devel/DIGI-WebApp/

pushd ~/devel/DIGI-WebApp/
rm cordova.js -f
rm phonegap.js -f
rm childbrowser.js -f
git add *
git commit -a -m "new build $versionCode"
git push phonegap master
popd

pushd zip_folder
rm cordova.js -f
rm phonegap.js -f
rm childbrowser.js -f
rm "$zipfile" -f
zip "$zipfile" -r *
popd

echo $versionCode > versionCode.txt
echo "done: "$version"."$versionCode" "$packagemode `date`
