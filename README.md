# jQuery.BEM: helps to work with BEM entities

With jQuery BEM you can interact with BEM Tree: set, remove and check modifiers.

[http://jsfiddle.net/vitkarpov/ouLr0ctw/](http://jsfiddle.net/vitkarpov/ouLr0ctw/)
![https://yadi.sk/i/zbyoEHKQdMpj8](https://raw.githubusercontent.com/vitkarpov/jquery.bem/master/docs/usage-example.gif)

## API

### setMod

```js
var $b = $('.block');

// .block_mod
$b.setMod('mod');

// .block_mod_val
$b.setMod('mod', 'val');

```

```js
var $el = $('.block__element');

// .block__element_mod
$el.setMod('mod');

// .block__element_mod_val
$el.setMod('mod', 'val');
```

What if you have mix of blocks or elements on the same node? You have to just specify what block do you want to change using special syntax for mods` keys.

```
block:mod
```

For instance,

```js
var $b = $('.block1 .block2')

// block1_mod_val
$b.setMod('block1:mod', 'val');

// block2_mod_val
$b.setMod('block2:mod', 'val');
```

If you don't specify the block then plugin will change them all

```js
// block1_mod_val block2_mod_val
$b.setMod('mod', 'val');
```

## delMod

Similary to setMod there is delMod method

```js
var $b = $('.block');

// .block_mod => .block
$b.delMod('mod');

```

```js
var $el = $('.block__element');

// .block__element_mod ==> .block__element
$el.delMod('mod');
```

Special syntax for mods` keys to specify block you want to change works as well:

```js
var $b = $('.block1 .block2')

// block1_mod_val => block1 block2_mod_val
$b.delMod('block1:mod');

// block2_mod_val => block1_mod_val block2
$b.delMod('block2:mod');
```

If you don't specify the block then plugin will remove that mod from all blocks added to the node:

```js
// block1_mod_val block2_mod_val => block1 block2
$b.delMod('mod');
```

## hasMod

```js
var $b = $('.block_mod_val');

// true
$b.hasMod('mod');
// true
$b.hasMod('mod', 'val');
// false
$b.hasMod('mod', 'val2');

$b.delMod('mod');

// false
$b.hasMod('mod');
```

```js
var $el = $('.block1 .block2__element_mod');

// true
$el.hasMod('mod');

// false
$el.hasMod('block1:mod');
```

## toggleMod

```js
var $b = $('.block_hidden');

// .block_hidden => .block
$b.toggleMod('hidden');

// .block => .block_hidden
$b.toggleMod('hidden');
```

