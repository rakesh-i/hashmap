class Node{
    constructor(key,value) {
        this.key = key;
        this.value = value;
        this.next = null;
    }
  }
  
  class LinkedList{
    constructor(){
      this.head = null;
      this.size = 0;
      this.tail = null;
    }
    append(key, value){
      this.size++;
      if(this.head==null){
        let node = new Node(key,value);
        this.head = node;
        this.tail = node;
        return;
      }
      let temp = this.head;
      while(temp.next!=null||temp.next!=undefined){
        temp = temp.next;
      }
      let node = new Node(key, value);
      temp.next = node;
      this.tail = node;
    }
    prepend(key, value){
        this.size++;
        if(this.head==null){
          let node = new Node(key, value);
          this.head = node;
          this.tail = node;
          return;
        }
        let node = new Node(key, value);
        node.next = this.head;
        this.head = node;
    }
    at(index){
      if(index>this.size-1||index<0){
        console.log('out of bound');
      }
      else{
        let node = this.head;
        let c = 0;
        while(node!=null&&c!=index){
          node = node.next;
          c++;
        }
        return node;
      }
    }
    pop(){
      if(this.head==null){
        console.log('list is empty');
        return;
      }
      if(this.head.next==null){
        this.head = null;
        this.tail = null;
        this.size = 0;
        return;
      }
      let temp = this.head;
      while(temp.next.next!=null){
        temp = temp.next; 
      }
      this.tail = temp;
      this.tail.next=null;
      this.size--;
    }
    toString(){
      let x = '';
      let node = this.head;
      while(node!=null){
        x+='( '+ node.value +' ) -> ';
        node = node.next;
      }
      x+= 'null';
      return x;
    }
    insertAt(key, value, index){
      if(index>this.size||index<0){
        console.log('out of bound');
      }
      else{
        if(index==0){
          this.prepend(value);
          return;
        }
        if(index==this.size){
          this.append(value);
          return;
        }
        let temp = this.head;
        for(let i=0; i<index-1; i++){
          temp =temp.next;
        }
        let node = new Node(key, value);
        let temp2 = temp.next;
        temp.next = node;
        node.next = temp2;
        this.size++;
      }
    }
    removeAt(index){
      if(index>=this.size||index<0){
        console.log('out of bound');
        return;
      }
      if(this.size==0){
        console.log('Empty list');
        return;
      }
      else{
        if(index==0){
          let node = this.head.next;
          this.head.next=null;
          this.head = node;
          this.size--;
          return;
        }
        if(index==this.size-1){
          this.pop();
          return;
        }
        let temp = this.head;
        for(let i=0; i<index-1; i++){
          temp =temp.next;
        }
        let temp2 = temp.next.next;
        temp.next = temp2;
        this.size--;
        
      }
    }
  }
  

class HashMap{
    constructor(){
        this.curLoad = 0;
        this.loadFactor = .75;
        this.bucketSize = 16;
        this.bucket = new Array(this.bucketSize);
    }
    hash(key) {
        let hashCode = 0;  
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i))%this.bucketSize;
        }
        return hashCode;
    } 

    set(key, value){
        const hashcode = this.hash(key);
        // console.log(this.bucket[hashcode]);
        if(this.bucket[hashcode]==undefined){
            const node = new Node(key, value);
            this.bucket[hashcode]  = node;
            this.curLoad++;
        }
        else if(this.bucket[hashcode]!=undefined){
            let node = this.bucket[hashcode];
            let x = this.search(node, key);
            // console.log(x);
            if(x==null){
                while(node.next!=null){
                    node = node.next;
                }
                const temp = new Node(key, value);
                node.next = temp;
                this.curLoad++;
            }
            else{
                x.value = value;
            }

        }
        if(this.curLoad/this.bucketSize>0.75){
            const extend = new Array(2*this.bucketSize);
            for(let i in this.bucket){
                extend[i] = this.bucket[i];
            }
            this.bucket = extend;
            this.bucketSize = this.bucketSize*2;
        }
    }
    has(key){
        let hashcode = this.hash(key);
        if(this.bucket[hashcode]!=undefined){
            let node = this.bucket[hashcode];
            let x = this.search(node, key);
            if(x==null){
                return false;
            }
            else{
                return true;
            }
        }
        return false;
        
    }
    search(head, key){
        while(head!=null){
            if(head.key==key){
                return head;
            }
            head = head.next;
        }
        return null;
    }

    remove(key){
        let x = this.has(key);
        if(x==false){
            return false;
        }
        else{
            this.curLoad--;
            const hashcode = this.hash(key);
            let node = this.bucket[hashcode];
            if(node.key==key){
                let temp = node.next;
                if(temp==null){
                    this.bucket[hashcode] = undefined;
                    return true;
                }
                else{
                    this.bucket[hashcode] = temp;
                    return true;
                }
            }
            while(node.next.key!=key){
                node = node.next;
            }
            let temp = node.next.next;
            node.next = null;
            return true;
        }
    }

    length(){
        return this.curLoad;
    }

    clear(){
        this.bucket = [];
        this.curLoad = 0;
    }

    entries(){
        let array = [];
        for(let i in this.bucket){
            let x = this.bucket[i];
            while(x!=null){
                array.push([x.key, x.value]);
                x = x.next;
            }
        }
        return array;
    }
     
}

const test = new HashMap();
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
test.set('moon', 'silver')
test.set('x', 'blue')
console.log(test);

