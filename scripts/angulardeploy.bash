#!/bin/bash
#
# Name: angulardeploy.bash
# Author: Michael Marod
# Purpose: To automatically deploy angular apps
# Requires: zip file be located in /usr/local/angularfiles, this
#       directory will be cleaned at the end of the script.
#

ZIPFILE=hmda-pilot.zip
BASENAME=$(basename $ZIPFILE .zip)
ANGULARDIR=/usr/local/angularfiles
ZIPFILEPATH="${ANGULARDIR}/${ZIPFILE}"

if [ ! -f $ZIPFILEPATH ]; then
   echo "${ZIPFILEPATH} does not exist!"
   echo "$0 [zipfile]"
   exit 1
fi

BASEDIR=/usr/local/APPS/angular/${BASENAME}
INITSCRIPT=/etc/init.d/nginx

if [ -d "${BASEDIR}" ]; then
    echo "Removing old application at ${BASEDIR}"
    /bin/rm -rf ${BASEDIR}
fi

echo "Extracting new application to ${BASEDIR}"
/usr/bin/unzip -q ${ZIPFILEPATH} -d ${BASEDIR}

echo "Removing zipfile"
/bin/rm ${ZIPFILEPATH}

echo "Add symlink for media/ dir"
/bin/ln -s /usr/local/APPS/media /usr/local/APPS/angular/${BASENAME}/media

echo "Fix permissions"
/bin/chown -R nginx:nginx ${BASEDIR}

echo "Restarting Apache"
${INITSCRIPT} restart

echo "Done!"
