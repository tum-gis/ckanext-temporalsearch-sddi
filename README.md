# ckanext-grouphierarchy - group hierarchy for CKAN

This CKAN extension is intended to be used in combination with the [SDDI CKAN Docker container](https://github.com/tum-gis/SDDI-CKAN-Docker).

## Overview

Provides the ability to search for datasets according to a given time frame. The search includes all datasets, in which the time of validity overlaps in at least one second with the search time frame.

## Compatibility

This extension has been tested with CKAN v2.8.0 or later. 

## Installation

Install the extension in your python environment
```
$ . /usr/lib/ckan/default/bin/activate
(pyenv) $ cd /usr/lib/ckan/default/src
(pyenv) $ pip install -e "git+https://tum-gis/ckanext-temporalsearch-sddi.git#egg=ckanext-temporalsearch-sddi"
```
Then change your CKAN ini file (e.g. development.ini or production.ini).
```
ckan.plugins = stats text_view recline_view ... temporalsearch
```

This extension will only work if you have the [scheming](https://github.com/tum-gis/ckanext-scheming-sddi) extension enabled. Otherwise datasets will not have the "time frame" tag and cannot be found by time search.

## Copyright & Licence

This module is Crown Copyright 2013 and openly licensed with AGPLv3 - see LICENSE file.
