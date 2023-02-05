//-------------------------------------------------------;
var fileNm = "js/update.js";
if( console ) console.log( "[ S ] - " + fileNm + "----------" );
//-------------------------------------------------------;
//-------------------------------------------------------;
(function(){
	//-------------------------------------------------------;
	// REQUIRE;
	//-------------------------------------------------------;
	
	var fs = require( "fs" );
	var url = require('url');
	
	//-------------------------------------------------------;
	// VARIABLE;
	//-------------------------------------------------------;
	
	var ROOT_PATH = process.cwd();
	
	var CP_COMMAND = {};
	//CP_COMMAND.MONGO = "../Binary/mongodb/mongodb-macos-x86_64-6.0.4/bin/mongosh" 
    CP_COMMAND.MONGO = "mongosh" 

    var DBJS_DIRECTORY_PATH = ROOT_PATH + "/dbjs/";
    var _tDbjs_PATH = ROOT_PATH + "/tdbjs/";
    var _JSON_PATH = ROOT_PATH.replace( /\\/gi, "/" ) + "/../crawler_sale_data/";

    //-------------------------------------------------------;
    // FUNCTION;
    //-------------------------------------------------------;
    //-------------------------;
    //-------------------------;
    //-------------------------;
    //-------------------------;
    //-------------------------;

    /*
        * @function
        * @param {String} dbjsNm
        * @param {boolean} bResult
        * @return {String} r
        */
    var exec_query_DB = function( dbjsNm, bResult ){

        var DBJS_NM = dbjsNm;
        var FILE_PATH = ROOT_PATH + "/dbjs/" + DBJS_NM;

        var command = CP_COMMAND.MONGO + ` "mongodb+srv://tjrwns:tjrwns2482%21%40@cluster0.980xizm.mongodb.net/Cluster0" ${FILE_PATH}`
        console.log( command )
        var r = cp.execSync( command ).toString();
            r = deleteLines( r , 8 )
        return r;
    };
	
	//-------------------------;
	//-------------------------;
	//-------------------------;
	//-------------------------;
	//-------------------------;
	/*
		* @function
		* @param {String} str
		* @param {Number} n
		* @return {String} str
		*/
	var deleteLines = function( str, n ){
		var i = 0,iLen = n,io;
		for(;i<iLen;++i){ str = str.slice(str.indexOf("\n") + 1, str.length ); }
		//str = str.replace( /\t/g, '' );
		//str = str.replace( /\r\n/g, '' );
		return str;
	};
	//-------------------------;
	//-------------------------;
	//-------------------------;
	//-------------------------;
	//-------------------------;
	/*
		* @function
		* @param {String} _url
		* @return {Object} o
		*/
	var paramToObject = function( _url ){
		
		//	var r =  url.split("?")[ 1 ];
		//	var a = r.split("&");
		//	var o = {};
		//	var i = 0,iLen = a.length,io;
		//	
		//	for(;i<iLen;++i){
		//		io = a[ i ];
		//		var _ta = io.split( "=" );
		//		o[ _ta[0] ] = _ta[ 1 ];
		//	}
		//	console.log( o )
			var queryData = url.parse( _url, true).query;
			return queryData;
	};
//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;

//-------------------------------------------------------;
// ROUTER;
//-------------------------------------------------------;
//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;
	/**
	 * 쿼리파일을 실행하는 라우터
	 * @function
	 * @param {http.ClientRequest} req
	 * <code>
		{

		}
	* </code>
	*
	* @param {http.ClientResponse} res
	* <code>
		{

		}
	* </code>
	*
	* @example
	* <code>
		http://localhost:8888/find_planning_by_brand?brandNm=espionage
	* </code>
	*/
	global.server.addRouter("/update",function( req, res, data ){
		
		var routerNm = req.url.split("?")[0];
		
		var _tdbjs_nm = "update";
		
		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		console.log( _tDbjs_PATH + "/" + _tdbjs_nm + ".tdbjs" ); 
		
		try
		{
			var _tQuery = fs.readFileSync( _tDbjs_PATH + "/" + _tdbjs_nm + ".tdbjs" ).toString();
		}
		catch( err )
		{
			console.log( routerNm + " - DBJS File Not Found! - " + err );
			res.end("{ sucess : 0, data : null }");
		}
		delete data[ "$height" ];
        console.log( data )
		var query = _tQuery.replace( "<!=DATA=!>", JSON.stringify( data.data ) )
                .replace( "<!=DOC_id=!>", JSON.stringify( data .doc_id ) );
		var dbjs_nm = "update.dbjs";

		var FILE_PATH = DBJS_DIRECTORY_PATH + dbjs_nm;
		
		console.log( FILE_PATH )

		fs.writeFileSync( DBJS_DIRECTORY_PATH + dbjs_nm , query, { flag : "w" } );

		var r = exec_query_DB( dbjs_nm )
		res.end( r );

	});
    /**
	 * 쿼리파일을 실행하는 라우터
	 * @function
	 * @param {http.ClientRequest} req
	 * <code>
		{

		}
	* </code>
	*
	* @param {http.ClientResponse} res
	* <code>
		{

		}
	* </code>
	*
	* @example
	* <code>
		http://localhost:8888/find_planning_by_brand?brandNm=espionage
	* </code>
	*/
	global.server.addRouter("/updateOne",function( req, res, data ){
		
		var routerNm = req.url.split("?")[0];
		
		var _tdbjs_nm = "updateOne";
		
		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		console.log( _tDbjs_PATH + "/" + _tdbjs_nm + ".tdbjs" ); 
		
		try
		{
			var _tQuery = fs.readFileSync( _tDbjs_PATH + "/" + _tdbjs_nm + ".tdbjs" ).toString();
		}
		catch( err )
		{
			console.log( routerNm + " - DBJS File Not Found! - " + err );
			res.end("{ sucess : 0, data : null }");
		}
		delete data[ "$height" ];
		var query = _tQuery.replace( "<!=DATA=!>", JSON.stringify( data ) );
		var dbjs_nm = "updateOne.dbjs";

		var FILE_PATH = DBJS_DIRECTORY_PATH + dbjs_nm;
		
		console.log( FILE_PATH )

		fs.writeFileSync( DBJS_DIRECTORY_PATH + dbjs_nm , query, { flag : "w" } );

		var r = exec_query_DB( dbjs_nm )
		res.end( r );

	});
	
})();

//-------------------------------------------------------;
if( console ) console.log( "[ E ] - " + fileNm + "----------" );
//-------------------------------------------------------;
