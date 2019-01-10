StorageManager = (function(){
    // @param storage_inst maybe must be the window.localStorage
    var StorageManager = function(storage_inst){
        this._storage = storage_inst;
    }

    var p = StorageManager.prototype;

    p.add_item = function(k, v){
        this._storage.setItem(k, v);
    }

    p.remove_item = function(k){
        this._storage.removeItem(k);
    }

    p.reset = function(){
        this._storage.clear();

        /* clear() あるねん...
        var all_keys = this._get_all_keys();
        for(var i=0;i<all_keys.length;i++){
            var curkey = all_keys[i];
            this.remove_item(curkey);
        }
        */
    }

    p._get_all_keys = function(){
        var ls = this._storage;
        return Object.keys(ls);
    }

    // @return An array of the object {'key':'...', 'value':'...'}
    // keys() 列挙のせいか Local Storage の仕様か知らんが
    // 順番に規則性が見られない（少なくとも追加順ではない）ので
    // with array 要らんかもなぁ……
    p.get_all_with_array = function(){
        var all_keys = this._get_all_keys();
        var return_values = [];
        for(var i=0;i<all_keys.length;i++){
            var curkey = all_keys[i];
            var curvalue = this.get_with_key(curkey);
            var return_value = {
                'key'   : curkey,
                'value' : curvalue
            };
            return_values.push(return_value);
        }
        return return_values;
    }

    // @return An object
    p.get_all_with_object = function(){
        var ls = this._storage;
        var all_keys = Object.keys(ls);
        var return_values = {};
        for(var i=0;i<all_keys.length;i++){
            var curkey = all_keys[i];
            var curvalue = this.get_with_key(curkey);
            return_values[curkey] = curvalue;
        }
        return return_values;
    }

    p.get_with_key = function(k){
        return this._storage.getItem(k);
    }

    return StorageManager;
})();

function clear_fields(){
    $('#input_key').val('');
    $('#input_value').val('');
}

function update_viewer(storagemanager){
    var values_array = storagemanager.get_all_with_array();
    var values_obj = storagemanager.get_all_with_object();

    $('#viewarea li').remove();
    for(var i=0;i<values_array.length;i++){
        var obj = values_array[i];
        var k = obj['key'];
        var v = obj['value'];
        var display_index = i+1;
        var display_text = display_index.toString() + ': ' + '"' + k + '"' + ' : "' + v + '"';
        var htmlstr = '<li>' + display_text + '</li>';
        $('#viewarea').append(htmlstr);
    }
}

$(function(){
    console.log(localStorage);
    var storagemanager = new StorageManager(localStorage);

    clear_fields();
    update_viewer(storagemanager);

    $("#button_add").click(function(){
        var k = $('#input_key').val();
        var v = $('#input_value').val();
        storagemanager.add_item(k, v);
        update_viewer(storagemanager);
    });

    $("#button_viewall").click(function(){
        update_viewer(storagemanager);
    });

    $("#button_reset").click(function(){
        storagemanager.reset();
        update_viewer(storagemanager);
    });

});
