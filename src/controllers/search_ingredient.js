
const prime=1009;

var SearchModel = () => {}
//Obtiene el valor hash de una receta
SearchModel.hashRecipe = function(ingredientes){
    var hash = 0;
    for(var i in ingredientes){
        //console.log(this.hashcode(ingredientes[i]));
        hash += this.hashcode(ingredientes[i]); 
    }
    
    return hash;
}
//Obtiene el valor hash de un ingrediente
SearchModel.hashcode = function(nombre_ingrediente){
    var hash = 0;
    for(var i=0; i < nombre_ingrediente.length; i++){
        /*if(nombre_ingrediente.charCodeAt(i)>=65 && nombre_ingrediente.charCodeAt(i)<=90){
            nombre_ingrediente[i]= String.fromCharCode(nombre_ingrediente.charCodeAt(i)+32);
            console.log(nombre_ingrediente);
            
        }*/
        hash += (41 * hash + nombre_ingrediente.charCodeAt(i) )%prime;
        //console.log(hash);
        
    }
    //console.log(hash%prime);
    
    return hash%prime;
}
//Obtiene todos las combinaciones posibles de ingredientes
SearchModel.getPosibilities = function(ingredientes,unique){
    unique = typeof unique === 'undefined' ? false : unique;
    var len = ingredientes.length + 1;
    var c_array = ingredientes.slice();
    var r_array = [];
    var t_array = [];
    var value;
    while (len--) {
        while (c_array.length) {
            value = c_array.shift();
            t_array = create_array(ingredientes.slice(), value);
            //console.log();
            repopulate_array(r_array, combinations(t_array, len, unique));
            //console.log("hola "+r_array);
        }
        c_array = ingredientes.slice();
        
    }
    r_array = remove_duplicate(r_array);
    r_array = remove_equals(r_array);
    return r_array;

        function create_array(array, value) {
            //console.log(this.this.hashRecipe(ingredientes));
            var r_array = [];
            var limit = array.indexOf(value);
            for (var i = 0; i < limit; i++) {
                r_array.push(array[i]);
            }
            while (limit--) {
                array.shift();
            }
            return array.concat(r_array);
        }
        function combinations(array, number, unique) {
            var r_array = [];
            var c_number = number;
            var first = array.shift();
            while (number--) {
                r_array.push([first].concat(array.slice(0, c_number - 1)));
                array.push(array.shift());
            }
            if (unique) {
                r_array.map(function(value) {
                    return value.sort();
                });
            }
            return r_array;
        }
        function remove_equals(array,value){
            //console.log(array);
            var s_array = [];
            //console.log(s_array);
            var c = 0;
            for (var i = 0, s = array.length; i < s; i++) {
                  //console.log(array[i]);
                  var a = String(array[i]);
                  a =a.split("-");
                  if( SearchModel.hashRecipe(a)!=c){
                    s_array.push(a);
                    c= SearchModel.hashRecipe(a);
                  }
              }
              return s_array;
          }
          function remove_duplicate(array, value) {
              return array.filter(function(item, index, inputArray) {
                  return inputArray.indexOf(item) == index;
              });
          }
          function repopulate_array(array, new_value) {
              for (var i = 0, s = new_value.length; i < s; i++) {
                  array.push(new_value[i].join('-'));
              }
              return array;
          }
      };


module.exports = SearchModel;
