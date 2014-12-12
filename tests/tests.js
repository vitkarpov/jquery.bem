mocha.setup('bdd');

/**
 * Using the following DOM Tree:
 *
 * <div class="block1">
 *    <div class="block1__element1">
 *       hello
 *    </div>
 *    <div class="block1__element2 block2">
 *       <div class="block1__element3 block2__element1">
 *           world
 *       </div>
 *    </div>
 * </div>
 *
 */

describe('jQuery.BEM', function() {

    describe('setMod', function() {
        it('should set mod without value', function() {
            var $b = $('.block1');
            $b.setMod('mod');
            expect($b.hasClass('.block_mod')).toBeTrue();
        });

        it('should set mod with value', function() {
            var $b = $('.block1');
            $b.setMod('mod', 'val');
            expect($b.hasClass('.block_mod_val')).toBeTrue();
        });

        it('should set mod for element', function() {
            var $b = $('.block1__element1');
            $b.setMod('mod');
            expect($b.hasClass('.block__element1_mod')).toBeTrue();
        });

        it('should set mod for all blocks or elements on specific node', function() {
            var $b = $('.block2');
            $b.setMod('mod');
            expect($b.hasClass('.block2_mod')).toBeTrue();
            expect($b.hasClass('.block1__element2_mod')).toBeTrue();
        });

        it('should set mod for specific block that is chosen by filter', function() {
            var $b = $('.block2');
            $b.setMod('block2:mod');
            expect($b.hasClass('.block2_mod')).toBeTrue();
            expect($b.hasClass('.block1__element2_mod')).toBeFalse();
        });
    });

});