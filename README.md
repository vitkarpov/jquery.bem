# jQuery.BEM: helps to work with BEM entities

## Intro

Let there's DOM Tree:

```html
<div class="block1">
    <div class="block1__element1">
        hello
    </div>
    <div class="block1__element2">
        <div class="block2">
            <div class="block2__element1">
                world
            </div>
        </div>
    </div>
</div>
```

On top of it there's BEM Tree:


```json
{
    "block": "block1",
    "content": [
        {
            "element": "element1",
            "content": "hello"
        },
        {
            "element": "element2",
            "content": {
                "block": "block2",
                "content": {
                    "element": "element1",
                    "content": "world"
                }
            }
        }
    ]
}

```

With jQuery BEM you can interact with BEM Tree using usual jQuery.

For instance,

```js
var $b = $('.block1');

// .block1 => .block1_hidden
$b.setMod('hidden');
```

```js
var $el = $('.block1__element1');

// .block1_type_war
$el.setMod('type', 'war');

// false
$el.hasMod('type', 'peace')

// true
$el.hasMod('type')

// war
$el.getMod('type');
```

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

## getMod

```js
var $b = $('.block1');

$b.setMod('color', 'red');

// red
$b.getMod('color');
```

```js
var $b = $('.block1 .block2');

$b.setMod('block1:color', 'green');

// null
$b.getMod('block2:color');

// null
$b.getMod('block1:visibility');

// green
$b.getMod('block1:color');
```