/**
 * # Source code with comments
 *
 * @copyright Viktor Karpov <viktor.s.karpov@gmail.com>
 */

(function ($, undefined) {
    /**
     * Sets modifier for each element in collection
     *
     * @param {String} mod   modifier or block`s filter with modifier
     * @param {String} value unnecessary value of the modifier
     * @return {jQuery}
     */
    $.fn.setMod = function(mod, value) {
        return this.each(function() {
            $(this).addClass(_buildClassesAccordingToMod.call(this, mod, value).join(' '));
        });
    }

    /**
     * Removes modifier for each element in collection
     *
     * @param  {String} mod   modifier or block`s filter with modifier
     * @param  {String} value unnecessary value of modifier
     * @return {jQuery}
     */
    $.fn.delMod = function(mod, value) {
        return this.each(function() {
            $(this).removeClass(_buildClassesAccordingToMod.call(this, mod, value).join(' '));
        });
    }

    /**
     * Checks modifier`s presence for the first element in collection
     *
     * @param  {String} mod   modifier or block`s filter with modifier
     * @param  {String} value unnecessary value of modifier
     * @return {Boolean}
     */
    $.fn.hasMod = function(mod, value) {
        return this.hasClass(_buildClassesAccordingToMod.call(this, mod, value).join(''));
    }

    /**
     * Toggles modifier for each element in collection
     *
     * @param  {String} mod   modifier or block`s filter with modifier
     * @param  {String} value unnecessary value of modifier
     * @return {jQuery}
     */
    $.fn.toggleMod = function(mod, value) {
        return this.each(function() {
            var $node = $(this);

            if ($node.hasMod(mod, value)) {
                $node.delMod(mod, value);
            } else {
                $node.setMod(mod, value);
            }
        });
    }

    /**
     * Returns block`s classes specified on a node
     * ```md
     * Warning: `this` inside function should refer to the node
     * ```
     * @example
     * ```
     * // node.classList = ['block1', 'block2'];
     *
     * // block1_mod block2_mod
     * _buildClassesAccordingToMod.call(node, 'mod')
     *
     * // block1_mod_value block2_mod_value
     * _buildClassesAccordingToMod.call(node, 'mod', 'value')
     *
     * // block1_mod
     * _buildClassesAccordingToMod.call(node, 'block1:mod')
     * ```
     *
     * @private
     * 
     * @param  {String} mod   modifier or block`s filter with modifier
     * @param  {String} value unnecessary value of modifier
     * @return {Array}
     */
    function _buildClassesAccordingToMod(mod, value) {
        var $node = $(this);
        var blockByFilter = _getIdBlockByFilter(mod);
        var classes = (blockByFilter)
                        ? [blockByFilter]
                        : $node.attr('class').split(' ');

        if (blockByFilter) {
            mod = mod.split(':')[1];
        }

        // modifier without value is a boolean
        value = value || true;

        return classes.map(function(item) {
            var objClass = bemNaming.parse(item);

            if (!bemNaming.validate(item)) {
                return false;
            }
            // `js-` prefixed classes shouldn't be processed
            if (/^js-/.test(item)) {
                return false;
            }
            // we don't need to process the same mod
            if (mod === objClass.modName) {
                return false;
            }

            return bemNaming.stringify({
                block: objClass.block, elem: objClass.elem,
                modName: mod, modVal: value
            })
        }).filter(Boolean);
    }

    /**
     * Returns block`s name parsed from filter
     * or false if there's no match
     *
     * @example
     * ```js
     * // block
     * _getIdBlockByFilter('block:mod');
     * ```
     *
     * @private
     *
     * @return {String|Boolean} block`s name or false
     */
    function _getIdBlockByFilter(filter) {
        var matches = filter.match(/([a-zA-Z0-9-]+):/);

        if (matches) {
            return matches[1];
        }
        return false;
    }

}(jQuery, undefined));