mocha.setup('bdd');

// use the following DOM Tree
HTML = [
    '<div class="block1 js-foo is-bar _baz">',
    '   <div class="block1__element1">',
    '      hello',
    '   </div>',
    '   <div class="block1__element2 block2">',
    '      <div class="block1__element3 block2__element1">',
    '          world',
    '      </div>',
    '   </div>',
    '</div>'
].join();

describe('jQuery.BEM', function() {

    beforeEach(function() {
        $('#html').append(HTML);

        this.$b1 = $('.block1');
        this.$b1__el1 = $('.block1__element1');
        this.$b1__el2 = $('.block1__element2');
        this.$b2 = $('.block2');
        this.$b2__el1 = $('.block2__element1');
    });
    afterEach(function() {
        $('#html').empty();

        delete this.$b1;
        delete this.$b1__el1;
        delete this.$b1__el2;
        delete this.$b2;
        delete this.$b2__el1;
    });

    describe('setMod', function() {
        it('should set mod without value', function() {
            expect(
                this.$b1.setMod('mod').hasClass('block1_mod')
            ).toBeTruthy();
        });

        it('should set mod with value', function() {
            expect(
                this.$b1.setMod('mod', 'val').hasClass('block1_mod_val')
            ).toBeTruthy();
        });

        it('should set mod for element', function() {
            expect(
                this.$b1__el1.setMod('mod').hasClass('block1__element1_mod')
            ).toBeTruthy();
        });

        it('should set mod for all blocks or elements on specific node', function() {
            this.$b2.setMod('mod');
            expect(this.$b2.hasClass('block2_mod')).toBeTruthy();
            expect(this.$b2.hasClass('block1__element2_mod')).toBeTruthy();
        });

        it('should set mod for specific block that is chosen by filter', function() {
            this.$b2.setMod('block2:mod');
            expect(this.$b2.hasClass('block2_mod')).toBeTruthy();
            expect(this.$b2.hasClass('block1__element2_mod')).toBeFalsy();
        });

        it('should not set mod for js- or is- prefixed classes', function() {
            this.$b1.setMod('mod');
            expect(this.$b1.hasClass('js-foo_mod')).toBeFalsy();
            expect(this.$b1.hasClass('is-bar_mod')).toBeFalsy();
            expect(this.$b1.hasClass('_baz_mod')).toBeFalsy();
        })
    });
    
    describe('delMod', function() {
        beforeEach(function() {
            this.$b1.setMod('mod');
            this.$b1.setMod('mod', 'value');
            this.$b2.setMod('mod');
            this.$b1__el1.setMod('mod', 'val');
            this.$b1__el2.setMod('mod');
        });

        it('should remove mod without value', function() {
            expect(
                this.$b1.delMod('mod').hasClass('block1_mod')
            ).toBeFalsy();
        });

        it('should remove mod with value', function() {
            expect(
                this.$b1__el1.delMod('mod', 'val').hasClass('block1_mod_val')
            ).toBeFalsy();
        });

        it('should remove mod for all blocks or elements on specific node', function() {
            this.$b2.delMod('mod');
            expect(this.$b2.hasClass('block2_mod')).toBeFalsy();
            expect(this.$b1__el2.hasClass('block1__element2_mod')).toBeFalsy();
        });

        it('should remove mod for specific block that is chosen by filter', function() {
            this.$b2.delMod('block2:mod');
            expect(this.$b2.hasClass('block2_mod')).toBeFalsy();
            expect(this.$b2.hasClass('block1__element2_mod')).toBeTruthy();
        });

        it('should remove mod with specific value', function() {
            this.$b1.delMod('mod', 'value');
            expect(this.$b1.hasClass('block1_mod_value')).toBeFalsy();
            expect(this.$b1.hasClass('block1_mod')).toBeTruthy();
        })
    });

    describe('hasMod', function() {
        beforeEach(function() {
            this.$b1.setMod('mod');
            this.$b2.setMod('block2:mod', 'val');
        });

        it('should check mod', function() {
            expect(this.$b1.hasMod('mod')).toBeTruthy();
        });

        it('should check mod for specific block chosen by filter', function() {
            expect(this.$b2.hasMod('block2:mod', 'val')).toBeTruthy();
        });
    });

    describe('toggleMod', function() {
        beforeEach(function() {
            this.$b1.toggleMod('mod');
        });

        it('should set mod if it`s has not been set yet', function() {
            expect(this.$b1.hasClass('block1_mod')).toBeTruthy();
        });

        it('should remove mod if it`s has been set already', function() {
            expect(
                this.$b1.toggleMod('mod').hasClass('block1_mod')
            ).toBeFalsy();
        });
    });
});