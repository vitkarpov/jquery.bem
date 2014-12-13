(function ($, undefined) {

    var MOD_DLMTR = '_';

    /**
     * Sets modifier for each element in collection
     *
     * @param {String} mod   modifier or block`s filter with modifier
     * @param {String} value unnecessary value of the modifier
     * @return {jQuery}
     */
    $.fn.setMod = function(mod, value) {
        return this.each(function() {
            $(this).addClass(getBlocksClassesOnNode.call(this, mod, value).join(' '));
        });
    }

    /**
     * Removes modifier for each element in collection
     *
     * @param  {[type]} mod   modifier or block`s filter with modifier
     * @param  {[type]} value unnecessary value of modifier
     * @return {jQuery}
     */
    $.fn.delMod = function(mod, value) {
        return this.each(function() {
            $(this).removeClass(getBlocksClassesOnNode.call(this, mod, value).join(' '));
        });
    }

    /**
     * Returns block`s classes specified on a node
     * Warning: this should refer to the node
     *
     * @param  {[type]} mod   modifier or block`s filter with modifier
     * @param  {[type]} value unnecessary value of modifier
     * @return {Array}
     */
    function getBlocksClassesOnNode(mod, value) {
        var $node = $(this);
        var blockByFilter = getIdBlockByFilter(mod);
        var classes = (blockByFilter)
                        ? [blockByFilter]
                        : $node.attr('class').split(' ');

        if (blockByFilter) {
            mod = mod.split(':')[1];
        }

        return classes.map(function(item) {
            // js, is, _ prefixed classes shouldn't be processed
            if (/^(js-|is-|_)\w+/.test(item)) {
                return '';
            }

            var clazz = item + MOD_DLMTR + mod;
            if (value) {
                clazz += MOD_DLMTR + value;
            }
            return clazz;
        });
    }

    /**
     * Returns block`s name parsed from filter
     * or false if there's no match
     *
     * @example
     * // => block
     * getIdBlockByFilter('block:mod');
     *
     * @return {String|Boolean} block`s name or false
     */
    function getIdBlockByFilter(filter) {
        var matches = filter.match(/([a-zA-Z0-9-]+):/);

        if (matches) {
            return matches[1];
        }
        return false;
    }

}(jQuery, undefined));