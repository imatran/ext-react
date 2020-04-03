module.exports = function(content, map) {
    const LoaderUtils = require("loader-utils");
    const FileSystem = require('fs');

    const query = LoaderUtils.getOptions(this) || {};
    const namespace = query.namespace;
    const output = query.output;
    const requires = query.requires || [];
    const callback = this.async();

    const makeRequires = () => {
        return '' +
            `Ext.define('${namespace}.${output.name}', {\n\trequires: [` +
            `\n\t\t${requires.reduce((p, v) => { return (p.length > 0 ? `${p},\n\t\t'${v}'` : `'${v}'`); }, '')}` +
            `\n\t]\n});`;
    };

    try {
        let match = content.match(/Ext[.]require\(([A-Za-z0-9., '"\\/\[\]\n]*)\)/);

        if(match) {
            match = match[0].match(/Ext[.]require\(\[?([^\]]*)\]?\)/);
            match = match[1].replace(/[\n]/g, '');

            match.split(',').forEach(name => {
                // Do not include requires that start with 'Namespace' in the bundle
                if(name.indexOf(`${namespace}.`) !== -1) {
                    content = content.replace(`,${name}`, '');
                    content = content.replace(`${name},`, '');
                }

                name = name.replace(/['" ]/g, '');
                if(name.indexOf('//') === -1 && requires.indexOf(name) === -1) {
                    requires.push(name);
                }
            });

            requires.sort((a, b) => {
                return a < b ? -1 : a > b ? 1 : 0;
            });
        }

        if(requires.length > 0) {
            const requires = makeRequires();
            FileSystem.writeFile(`${output.path}/${output.name}.js`, requires, err => {
                if (err) throw err;
            });
        }

        query.requires = requires;
        callback(null, content, map);
    } catch (e) {
        callback(e);
    }
};
