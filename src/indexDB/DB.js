class DB {

    constructor(base,list){
        this.dbName = base;
        this.list = list;
        this.getDBs(true);
    }

    getDBs(set=true,fn=null){

        indexedDB.databases().then((res)=>{
            let databases = {};
            res.map((v)=>{
                databases[v.name] = v;
            })
            this.databases = databases;
            if(set){
                this.setDBs(this.dbName);
            }
        });

    }



    setDBs(name) {
        if(!Object.hasOwn(this.databases,name)){
            // console.log(this.databases);
            let openRequest = window.indexedDB.open(name,1);

            openRequest.onupgradeneeded = (event)=>{

                console.log(event);
                this.list.forEach( element => {

                    if(!openRequest.result.objectStoreNames.contains(element)) {
                        openRequest.result.createObjectStore(element, {keyPath: 'id',autoIncrement:true}); // crearlo
                    }

                });

            }

            openRequest.onerror = function() {
                console.error("Error", openRequest.error);
            };

            openRequest.onsuccess = function() {
                let db = openRequest.result;
                console.log(db)
                // db.result.createObjectStore("ha", {keyPath: 'id',autoIncrement:true});
                // continúa trabajando con la base de datos usando el objeto db
            };

        }else{

            this.db = indexedDB.open(this.dbName,1);
            // console.log(this.db);

            // openRequest.onupgradeneeded(function() {
            //     let db = openRequest.result;
            //     this.db = db;
            // })

        }

        this.getDBs(false);
    }

    all(db){
    }

    get(db,fn=null,id=null){
        if(!db){return;}
        let DB = indexedDB.open(this.dbName,1);
        
        
        
        // DB = DB.result;
        // console.log(DB)
        DB.onsuccess = (e)=>{
            let transaction = DB.result.transaction(db, "readwrite"); // (1)
    
            // obtiene un almacén de objetos para operar con él
            let books = transaction.objectStore(db); // (2)
    
            // let book = val;
        // created: new Date()
            let request = {}; // (3)
            if(id){
                request = books.get(id); // (3)
            }else{
                request = books.getAll(); // (3)
            }
    
    
            request.onsuccess = function() { // (4)
                if(fn){
                    fn(request.result);
                }else{
                    console.log(request)
                }
            };
    
            request.onerror = function() {
                console.log("Error", request.error);
            };
            // console.log(e.target.result.transaction(db,"readwrite"))
            // console.log(DB.result.transaction(db,"readwrite"))
        }
    }

    delete(db,id=null){
        if(!db){return;}
        let DB = indexedDB.open(this.dbName,1);
        
        
        
        // DB = DB.result;
        // console.log(DB)
        DB.onsuccess = (e)=>{
            let transaction = DB.result.transaction(db, "readwrite"); // (1)
    
            // obtiene un almacén de objetos para operar con él
            let books = transaction.objectStore(db); // (2)
    
            // let book = val;
        // created: new Date()
            let request = {}; // (3)
            if(id){
                request = books.delete(id); // (3)
            }else{
                return;
            }
    
    
            request.onsuccess = function() { 
            };
    
            request.onerror = function() {
                console.log("Error", request.error);
            };
            // console.log(e.target.result.transaction(db,"readwrite"))
            // console.log(DB.result.transaction(db,"readwrite"))
        }
    }

    new(db=null,val={},f=null){
        if(!db){return;}
        let DB = indexedDB.open(this.dbName,1);
        
        
        
        // DB = DB.result;
        console.log(DB)
        DB.onsuccess = (e)=>{
            let transaction = DB.result.transaction(db, "readwrite"); // (1)
    
            // obtiene un almacén de objetos para operar con él
            let books = transaction.objectStore(db); // (2)
    
            let book = val;
        // created: new Date()
    
            let request = books.add(book); // (3)
    
            request.onsuccess = function() { // (4)
                if(f){
                    f(request.result);

                }
                return request.result;
                console.log("Libro agregado al almacén", request.result);
            };
    
            request.onerror = function() {
                console.log("Error", request.error);
            };
            // console.log(e.target.result.transaction(db,"readwrite"))
            // console.log(DB.result.transaction(db,"readwrite"))
        }
    }

    put(db,id,val={}){
        if(!db){return;}
        let DB = indexedDB.open(this.dbName,1);
        
        
        
        // DB = DB.result;
        console.log(DB)
        DB.onsuccess = (e)=>{
            let transaction = DB.result.transaction(db, "readwrite"); // (1)
    
            // obtiene un almacén de objetos para operar con él
            let books = transaction.objectStore(db); // (2)
    
            let book = val;
            book.id= id;
        // created: new Date()
    
            let request = books.put(book); // (3)
    
            request.onsuccess = function() { // (4)
                // return request.result;
                console.log("Libro agregado al almacén", request.result);
            };
    
            request.onerror = function() {
                console.log("Error", request.error);
            };
            // console.log(e.target.result.transaction(db,"readwrite"))
            // console.log(DB.result.transaction(db,"readwrite"))
        }
    }

}

export default DB