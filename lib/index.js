(function () {
'use strict';

class Disposable {
  constructor(block) {
    if (!block) {
      throw new Error('A Disposable must be created with a dispose callback');
    }
    this.block = block;
  }

  dispose() {
    if (this.block) {
      this.block();
      delete this.block;
    }
  }
}



class DisposableEvent extends Disposable {
  constructor(target, event, listener) {
    const events = event.split(/\s+/g);

    if (typeof target.addEventListener === 'function') {
      super(() => events.forEach(e => target.removeEventListener(e, listener)));
      events.forEach(e => target.addEventListener(e, listener));
    } else if (typeof target.on === 'function') {
      super(() => events.forEach(e => target.off(e, listener)));
      events.forEach(e => target.on(e, listener));
    }
  }
}

//  ######  ######## ########
// ##    ##    ##    ##     ##
// ##          ##    ##     ##
//  ######     ##    ##     ##
//       ##    ##    ##     ##
// ##    ##    ##    ##     ##
//  ######     ##    ########

function merge(a, b) {
  const c = {};

  for (let k in a) {
    c[k] = a[k];
  }
  for (let k in b) {
    c[k] = b[k];
  }

  return c;
}



function asArray(collection) {
  return [].slice.call(collection);
}

// ########   #######  ##     ##
// ##     ## ##     ## ###   ###
// ##     ## ##     ## #### ####
// ##     ## ##     ## ## ### ##
// ##     ## ##     ## ##     ##
// ##     ## ##     ## ##     ##
// ########   #######  ##     ##

let previewNode;



function getNode(html) {
  if (!html) {
    return undefined;
  }
  if (previewNode == null) {
    previewNode = document.createElement('div');
  }

  previewNode.innerHTML = html;
  const node = previewNode.firstElementChild;
  previewNode.innerHTML = '';
  return node;
}











// ########     ###    ########  ######## ##    ## ########  ######
// ##     ##   ## ##   ##     ## ##       ###   ##    ##    ##    ##
// ##     ##  ##   ##  ##     ## ##       ####  ##    ##    ##
// ########  ##     ## ########  ######   ## ## ##    ##     ######
// ##        ######### ##   ##   ##       ##  ####    ##          ##
// ##        ##     ## ##    ##  ##       ##   ###    ##    ##    ##
// ##        ##     ## ##     ## ######## ##    ##    ##     ######

function eachParent(node, block) {
  let parent = node.parentNode;

  while (parent) {
    block(parent);

    if (parent.nodeName === 'HTML') {
      break;
    }
    parent = parent.parentNode;
  }
}

function parents(node, selector = '*') {
  const parentNodes = [];

  eachParent(node, parent => {
    if (parent.matches && parent.matches(selector)) {
      parentNodes.push(parent);
    }
  });

  return parentNodes;
}



function nodeAndParents(node, selector = '*') {
  return [node].concat(parents(node, selector));
}

// ######## ##     ## ######## ##    ## ########  ######
// ##       ##     ## ##       ###   ##    ##    ##    ##
// ##       ##     ## ##       ####  ##    ##    ##
// ######   ##     ## ######   ## ## ##    ##     ######
// ##        ##   ##  ##       ##  ####    ##          ##
// ##         ## ##   ##       ##   ###    ##    ##    ##
// ########    ###    ######## ##    ##    ##     ######

console.log(merge({ foo: 'foo' }, { bar: 'bar' }));

}());
