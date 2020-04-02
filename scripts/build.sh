BUILDENVIRONMENT="production"

cd themes/docsy && git submodule update -f --init
cd ../..
hugo --environment "$BUILDENVIRONMENT"
hugo --gc --minify
