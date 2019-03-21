
export default class utils {

    static getStrippedEscapedAuthorId(authorId) {
        if(authorId) {
            // copy from https://shafiqul.wordpress.com/2014/07/11/javascript-how-to-remove-http-from-url/
            authorId = authorId.replace(/^https?:\/\//,'');
            return encodeURIComponent(authorId);
        }
        throw new Error("getStrippedEscapedAuthorId invalid argument");
    }

    static unEscapeAuthorId(escapedAuthorId) {
        if(escapedAuthorId) {
            let authorId = decodeURIComponent(escapedAuthorId);
            authorId = "https://" + authorId;
            return authorId;
        }
        throw new Error("unEscapeAuthorId invalid argument");
    }


	static getShortAuthorId(authorId){
        if(authorId) {
            let tmp = authorId.split("/author/");
            if(tmp.length === 2) {
                return tmp[1];
            } else {
                throw new Error("getShortAuthorId invalid argument");
            }
        }
        throw new Error("getShortAuthorId invalid argument");
    }
    
    static getHostName(authorId){
        if(authorId) {
            let tmp = authorId.split("/");
            if(tmp.length === 5) {
                return tmp[2];
            } else {
                throw new Error("getHostName invalid argument");
            }
        }
        throw new Error("getHostName invalid argument");
	}
}
