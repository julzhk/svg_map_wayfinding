console.log('start');
var startnode = '114e';
var endnode = '81';

function split_string(source, splitby){
    return source.split(splitby)
}
function split_byencodedDash(source){
    return split_string(source, '_x5F_');
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
    //            console.log(node_id + 'id: '+ kid.id + ', type: '+ kid.nodeType);
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
connections = extract_connectionlist();

var x = _.map(connections, split_byencodedDash);
x = _.map(x, remove_connection);
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
        var edgelink = find_node(_.last(ele), x);
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

_.each(routes,function(ele,index,lst){console.log(String(ele))});
var solns = find_solutions(routes,endnode);


console.log('routes found');
_.each(solns,function(ele,index,lst){console.log(String(ele))});
console.log('done');