console.log('start');
var startnode = 'lobby0';
var endnode = '40';

function split_string(source, splitby){
    return source.split(splitby)
}
function split_byencodedDash(source){
    return split_string(source, '_');
}
function remove_connection(arr){
    return _.rest(arr);
}
function find_node(ele,arr){
    r =  _.map(arr, function(a){ if (_.contains(a, ele)){ return a; }});
    return _.compact(r);
}

function extract_connectionlist(){
    var elements = [];
    _.map(document.getElementsByTagName('svg'), function(svg){
//    var svg = document.getElementsByTagName('svg')[0];

        var kids = svg.childNodes;
        for (var i=0,len=kids.length;i<len;++i){
            var kid = kids[i];
            var node_id = String(kid.id);
            // console.log(node_id + 'id: '+ kid.id + ', type: '+ kid.nodeType);
            if (node_id.indexOf("connection") > -1) {
                elements.push(node_id);
            }
        }
    })
       return elements;

};
function extract_connector(startnode, ele){
    if (ele[0] == startnode){
        return ele[1];
    } else {
        return ele[0];
    }
}
var connections = extract_connectionlist();
var all_connectors = _.map(connections, split_byencodedDash);
all_connectors = _.map(all_connectors, remove_connection);
var routes = [[startnode]];

function listExistsInListOfLists(lst,targetlst){
//    concat haystack
    var haystack = [];
    _.each(lst, function (ele, index, lst) {
        haystack[index] = String(ele);
    });
    var present = _.contains(haystack, String(targetlst));
    return present;
    }

function make_steps(routes) {
    _.each(routes, function (ele, index, lst) {
        var edgelink = find_node(_.last(ele), all_connectors);
        _.each(edgelink, function (edge_ele, edge_index, edge_lst) {
            var new_edge = extract_connector(ele, edge_ele);
            if( ! (_.contains(ele, new_edge))) {
                var new_route = routes[index].concat(new_edge);
                if( ! (listExistsInListOfLists(routes, new_route))) {
                    lst.push(new_route);
                }
            }
        });
    });
    return routes;
}
for (var i = 0; i < 15; i++) {
    routes = make_steps(routes);
}

function find_solutions(routes,endnode){
    solns =  _.filter(routes, function(potential){ return _.contains(potential, endnode) });
    //  shortest first
    solns.sort(function(a, b){return a.length -b.length });
    return solns;
}
// to see each potential path:
//_.each(routes,function(ele,index,lst){console.log(String(ele))});
var solns = find_solutions(routes,endnode);
console.log('route found');
results = _.each(solns,function(ele,index,lst){console.log(String(ele))});
result = _.each(solns[0],function(ele,index,lst){console.log(String(ele))});
introtext = 'For example, to go from '+ startnode + ' to room '+ endnode + ', you can take the following path:<br>';
document.getElementById('path').innerHTML += introtext;
path = 'Orientate yourself, then go:<br>';
_.each(solns[0],function(ele){path += ' to room "' + ele + '",<br>'});
path += ' and now you have arrived!'
document.getElementById('path').innerHTML += path;
console.log('done');