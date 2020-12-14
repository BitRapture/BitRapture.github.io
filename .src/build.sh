#!/bin/sh

# Get variables
echo "Please provide the content file name"
read V_CONTENT
echo "Please enter the title name"
read V_TITLE
echo "Please enter the export file name"
read V_EXPORT

# Create new file and sandwich the content file between header.html and footer.html
cat "templates/header.html" | sed "s/__TITLE__/$V_TITLE/g" > "${V_EXPORT}.html"
cat "page_content/${V_CONTENT}.html" >> "${V_EXPORT}.html"
cat "templates/footer.html" >> "${V_EXPORT}.html"

# Output success if no error is thrown
echo "Done, created file: ${V_EXPORT}.html"
