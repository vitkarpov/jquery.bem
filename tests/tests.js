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

    beforeEach(function() {
        this.$b1 = $('.block1');
        this.$b1__el1 = $('.block1__element1');
        this.$b1__el2 = $('.block1__element2');
        this.$b2 = $('.block2');
        this.$b2__el1 = $('.block2__element1');
    });
    afterEach(function() {
        delete this.$b1;
        delete this.$b1__el1;
        delete this.$b1__el2;
        delete this.$b2;
        delete this.$b2__el1;
    });

    describe('setMod', function() {
        it('should set mod without value', function() {
            expect(
                this.$b1.setMod('mod').hasClass('.block1_mod')
            ).toBeTrue();
        });

        it('should set mod with value', function() {
            expect(
                this.$b1.setMod('mod', 'val').hasClass('.block1_mod_val')
            ).toBeTrue();
        });

        it('should set mod for element', function() {
            expect(
                this.$b1__el1.setMod('mod').hasClass('.block1__element1_mod')
            ).toBeTrue();
        });

        it('should set mod for all blocks or elements on specific node', function() {
            this.$b2.setMod('mod');
            expect(this.$b2.hasClass('.block2_mod')).toBeTrue();
            expect(this.$b2.hasClass('.block1__element2_mod')).toBeTrue();
        });

        it('should set mod for specific block that is chosen by filter', function() {
            this.$b2.setMod('block2:mod');
            expect(this.$b2.hasClass('.block2_mod')).toBeTrue();
            expect(this.$b2.hasClass('.block1__element2_mod')).toBeFalse();
        });
    });
    
    describe('delMod', function() {
        beforeEach(function() {
            this.$b1.setMod('mod');
            this.$b2.setMod('mod');
            this.$b1__el1.setMod('mod');
            this.$b1__el2.setMod('mod');
        });

        it('should set mod without value', function() {
            expect(
                this.$b1.delMod('mod').hasClass('.block1_mod')
            ).toBeFalse();
        });

        it('should set mod with value', function() {
            expect(
                this.$b1.delMod('mod', 'val').hasClass('.block1_mod_val')
            ).toBeFalse();
        });

        it('should set mod for element', function() {
            expect(
                this.$b1__el1.delMod('mod').hasClass('.block1__element1_mod')
            ).toBeFalse();
        });

        it('should set mod for all blocks or elements on specific node', function() {
            this.$b2.delMod('mod');
            expect(this.$b2.hasClass('.block2_mod')).toBeFalse();
            expect(this.$b1__el2.hasClass('.block1__element2_mod')).toBeFalse();
        });

        it('should set mod for specific block that is chosen by filter', function() {
            this.$b2.delMod('block2:mod');
            expect(this.$b2.hasClass('.block2_mod')).toBeFalse();
            expect(this.$b2.hasClass('.block1__element2_mod')).toBeTrue();
        });
    });
});