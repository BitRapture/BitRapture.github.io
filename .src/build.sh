#!/bin/sh

# Get variables
echo "Please provide the content file name"
read V_CONTENT
echo "Please provide an include file name (optional)"
read V_INCLUDE
echo "Please enter the title name"
read V_TITLE
echo "Please enter the export file name"
read V_EXPORT

# Create new file and sandwich the content file between header.html and footer.html
# Optional: add an include.html file that allows for css and js to be added to separate pages
cat "templates/headerIncludes.html" | sed "s/__TITLE__/$V_TITLE/g" > "${V_EXPORT}.html"
if [ -a "page_includes/${V_INCLUDE}.html" ]
then
  cat "page_includes/${V_INCLUDE}.html" >> "${V_EXPORT}.html"
fi
cat "templates/header.html" | sed "s/__TITLE__/$V_TITLE/g" >> "${V_EXPORT}.html"
cat "page_content/${V_CONTENT}.html" >> "${V_EXPORT}.html"
cat "templates/footer.html" >> "${V_EXPORT}.html"
mv "${V_EXPORT}.html" ".."

# Output success if no error is thrown
echo "Done, created file: ${V_EXPORT}.html"
