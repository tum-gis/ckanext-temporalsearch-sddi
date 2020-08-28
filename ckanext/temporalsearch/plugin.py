import ckan.plugins as plugins
import ckan.plugins.toolkit as toolkit


class TemporalsearchPlugin(plugins.SingletonPlugin):
    plugins.implements(plugins.IConfigurer)
    plugins.implements(plugins.IPackageController, inherit=True)

    def update_config(self, config):
        toolkit.add_template_directory(config, 'templates')
        toolkit.add_resource('fanstatic', 'ckanext-temporalsearch')

    def before_search(self, search_params):
        extras = search_params.get('extras')
        if not extras:
            # There are no extras in the search params, so do nothing.
            return search_params
        start_date = extras.get('ext_startdate')
        end_date = extras.get('ext_enddate')
        if not start_date or not end_date:
            # The user didn't select a start and end date, so do nothing.
            return search_params

        # Add a date-range query with the selected start and end dates into the
        # Solr facet queries.
        fq = search_params['fq']
        #fq = '{fq} +metadata_modified:[{start_date} TO {end_date}]'.format(fq=fq, start_date=start_date, end_date=end_date)
        #fq = '{fq} (+begin_collection_date:[* TO {end_date}] OR -begin_collection_date:[* TO *]) +(+end_collection_date:[{start_date} TO *] OR -end_collection_date:[* TO *])'.format(fq=fq, end_date=end_date,start_date=start_date)
        #fq = '{fq} -end_collection_date:[* TO *]'.format(fq=fq)
        fq = '{fq} (begin_collection_date:[* TO {end_date1}] -end_collection_date:[* TO *]) OR (-begin_collection_date:[* TO *] end_collection_date:[{start_date1} TO *]) OR (begin_collection_date:[* TO {end_date2}] end_collection_date:[{start_date2} TO *])'.format(fq=fq, end_date1=end_date, start_date1=start_date, end_date2=end_date, start_date2=start_date)
        #fq = '{fq} +begin_collection_date:[* TO {end_date}] +end_collection_date:[{start_date} TO *]'.format(fq=fq, end_date=end_date,start_date=start_date)
        #f = open(fq)
        search_params['fq'] = fq
        return search_params


#begin_collection_date
#end_collection_date
