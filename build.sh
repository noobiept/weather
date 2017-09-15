echo "\nStarting the build script.\n"
echo "\nClear the release directory.\n"
rm -rf ./release/*

echo "\nBuild the code.\n"
webpack --env.release

echo "\nCreate the release directories.\n"
mkdir -vp ./release/
mkdir -vp ./release/css/
mkdir -vp ./release/libraries/

echo "\nCopy the necessary files.\n"
cp -v ./index.html ./release/index.html
cp -v ./dist/bundle.js ./release/bundle.js
cp -v -a ./css/ ./release/
cp -v ./node_modules/react/dist/react.min.js ./release/libraries/react.js
cp -v ./node_modules/react-dom/dist/react-dom.min.js ./release/libraries/react-dom.js

echo "\nUpdate the index.html paths.\n"

htmlprocessor ./release/index.html -o ./release/index.html

echo "\nDone!\n"