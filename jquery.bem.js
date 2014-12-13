(function ($, undefined) {

    var MOD_DLMTR = '_';

    /**
     * Sets modifier for each element in collection
     *
     * @param {String} mod   modifier or block`s filter with modifier
     * @param {String} value unnecessary value of the modifier
     */
    $.fn.setMod = function(mod, value) {
        return this.each(function() {
            var $node = $(this);
            var blockByFilter = getIdBlockByFilter(mod);
            var classes = (blockByFilter)
                            ? [blockByFilter]
                            : $node.attr('class').split(' ');

            if (blockByFilter) {
                mod = mod.split(':')[1];
            }

            classes.forEach(function(item) {
                var clazz = item + MOD_DLMTR + mod;
                if (value) {
                    clazz += MOD_DLMTR + value;
                }
                $node.addClass(clazz);
            });
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