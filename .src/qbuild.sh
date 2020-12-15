#!/bin/sh

# This version relies on the files being appropriately named
# For content files, they must be prefixed with "c_"
# For include files, they must be prefixed with "i_"
# Outputs a full page of the same name

# Get variables
echo "Please provide the page name"
read V_NAME
echo "Please provide the title name"
read V_TITLE

# Create new file and sandwich the content file between header.html and footer.html
# Optional: add an include.html file that allows for css and js to be added to separate pages
cat "templates/headerIncludes.html" > "${V_NAME}.html"
if [ -a "page_includes/i_${V_NAME}.html" ]
then
  cat "page_includes/i_${V_NAME}.html" >> "${V_NAME}.html"
fi
cat "templates/header.html" | sed "s/__TITLE__/$V_TITLE/g" >> "${V_NAME}.html"
cat "page_content/c_${V_NAME}.html" >> "${V_NAME}.html"
cat "templates/footer.html" >> "${V_NAME}.html"
mv "${V_NAME}.html" ".."

# Output success if no error is thrown
echo "Done, created file: ${V_NAME}.html"
