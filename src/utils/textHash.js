import Hashes from "jshashes";
const hash = (text) => {
    var SHA256 = new Hashes.SHA256();
    return SHA256.hex(text);

};

export default hash;