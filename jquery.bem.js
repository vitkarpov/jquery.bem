/*! v1.0.0 — 2015-01-02 */

(function (global) {
/**
 * Enum for types of BEM entities.
 *
 * @readonly
 * @enum {String}
 */
var TYPES = {
    BLOCK:     'block',
    BLOCK_MOD: 'blockMod',
    ELEM:      'elem',
    ELEM_MOD:  'elemMod'
};

/**
 * BEMNaming allows getting information about BEM entity using string as well as forming string
 * representation based on BEM-naming.
 *
 * @param {Object} [options]
 * @param {Object} [options.elem='__'] Separates element's name from block.
 * @param {Object} [options.mod='_']   Separates names and values of modifiers from blocks and elements.
 * @param {Object} [options.wordPattern='[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*] Defines which symbols can be used for block,
 *                                                                       element and modifier's names.
 * @name BEMNaming
 * @class
 */
function BEMNaming(options) {
    options || (options = {});

    /**
     * String to separate elem from block.
     *
     * @type {String}
     */
    this.elemDelim = options.elem || options.elemSeparator || '__';
    /**
     * String to separate names and values of modifiers from blocks and elements.
     *
     * @type {String}
     */
    this.modDelim = options.mod || options.modSeparator || '_';
    this._wordPattern = options.wordPattern || options.literal && (options.literal + '+') ||
        '[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*';

    this._buildRegex();
}

/**
 * Checks a string to be valid BEM notation.
 *
 * @param {String} str String representation of BEM entity.
 * @returns {Boolean}
 */
BEMNaming.prototype.validate = function (str) {
    return this._regex.test(str);
};

/**
 * Returns a string indicating the type of the BEM entity.
 *
 * @param {Object|String} obj BEM-naming object or string representation of BEM entity.
 * @returns {String}
 */
BEMNaming.prototype.typeOf = function (obj) {
    if (typeof obj === 'string') {
        obj = this.parse(obj);
    }

    if (!obj || !obj.block) return;

    var hasModVal = obj.hasOwnProperty('modVal'),
        isMod = obj.modName && (!hasModVal || obj.modVal);

    if (obj.elem) {
        if (isMod) return TYPES.ELEM_MOD;
        if (!hasModVal) return TYPES.ELEM;
    }

    if (isMod) return TYPES.BLOCK_MOD;
    if (!hasModVal) return TYPES.BLOCK;
};

/**
 * Checks whether BEM-naming object or string is a block.
 *
 * @param {Object|String} obj BEM-naming object or string representation of BEM entity.
 * @returns {Boolean}
 */
BEMNaming.prototype.isBlock = function (obj) {
    return this.typeOf(obj) === TYPES.BLOCK;
};

/**
 * Checks whether BEM-naming object or string is modifier of a block.
 *
 * @param {Object|String} obj BEM-naming object or string representation of BEM entity.
 * @returns {Boolean}
 */
BEMNaming.prototype.isBlockMod = function (obj) {
    return this.typeOf(obj) === TYPES.BLOCK_MOD;
};

/**
 * Checks whether BEM-naming object or string is element of a block.
 *
 * @param {Object|String} obj BEM-naming object or string representation of BEM entity.
 * @returns {Boolean}
 */
BEMNaming.prototype.isElem = function (obj) {
    return this.typeOf(obj) === TYPES.ELEM;
};

/**
 * Checks whether BEM-naming object or string is element of a block.
 *
 * @param {Object|String} obj BEM-naming object or string representation of BEM entity.
 * @returns {Boolean}
 */
BEMNaming.prototype.isElemMod = function (obj) {
    return this.typeOf(obj) === TYPES.ELEM_MOD;
};

/**
 * Parses string into BEM-naming.
 *
 * @param {String} str String representation of BEM entity.
 * @returns {Object|undefined}
 */
BEMNaming.prototype.parse = function (str) {
    var executed = this._regex.exec(str);

    if (!executed) return;

    var elem = executed[5],
        modName = executed[2] || executed[6],
        modVal = executed[3] || executed[7],
        notation = {};

    if (modName && (modVal === undefined)) {
        modVal = true;
    }

    notation.block = executed[1] || executed[4];
    elem && (notation.elem = elem);
    modName && (notation.modName = modName);
    modVal && (notation.modVal = modVal);

    return notation;
};

/**
 * Forms a string according to BEM-naming object.
 *
 * @param {Object} obj BEM-naming object
 * @returns {String}
 */
BEMNaming.prototype.stringify = function (obj) {
    if (!obj || !obj.block) {
        throw new Error('The field `block` is undefined. It is impossible to stringify BEM notation.');
    }

    var buf = [obj.block];

    if (obj.elem) {
        buf.push(this.elemDelim + obj.elem);
    }

    if (obj.modName) {
        var modVal = obj.modVal;

        if (modVal || modVal === 0 || !obj.hasOwnProperty('modVal')) {
            buf.push(this.modDelim + obj.modName);
        }

        if (modVal && modVal !== true) {
            buf.push(this.modDelim + modVal);
        }
    }

    return buf.join('');
};

BEMNaming.prototype._buildRegex = function () {
    var word = this._wordPattern,
        block = '(' + word + ')',
        elem = '(?:' + this.elemDelim + '(' + word + '))?',
        mod = '(?:' + this.modDelim + '(' + word + '))?';

    this._regex = new RegExp(['^', block, mod, mod, '$|^', block, elem, mod, mod, '$'].join(''));
};

var defineAsGlobal = true,
    originalNaming = new BEMNaming(),
    bemNaming = function (options) {
        return new BEMNaming(options);
    };

bemNaming.BEMNaming  = BEMNaming;
bemNaming.validate   = function () { return originalNaming.validate.apply(originalNaming, arguments);   };
bemNaming.parse      = function () { return originalNaming.parse.apply(originalNaming, arguments);      };
bemNaming.stringify  = function () { return originalNaming.stringify.apply(originalNaming, arguments);  };
bemNaming.typeOf     = function () { return originalNaming.typeOf.apply(originalNaming, arguments);     };
bemNaming.isBlock    = function () { return originalNaming.isBlock.apply(originalNaming, arguments);    };
bemNaming.isElem     = function () { return originalNaming.isElem.apply(originalNaming, arguments);     };
bemNaming.isBlockMod = function () { return originalNaming.isBlockMod.apply(originalNaming, arguments); };
bemNaming.isElemMod  = function () { return originalNaming.isElemMod.apply(originalNaming, arguments);  };

// Node.js
if (typeof exports === 'object') {
    module.exports = bemNaming;
    defineAsGlobal = false;
}

// YModules
if (typeof modules === 'object') {
    modules.define('bem-naming', function (provide) {
        provide(bemNaming);
    });
    defineAsGlobal = false;
}

// AMD
if (typeof define === 'function') {
    define(function (require, exports, module) {
        module.exports = bemNaming;
    });
    defineAsGlobal = false;
}

defineAsGlobal && (global.bemNaming = bemNaming);
})(this);

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