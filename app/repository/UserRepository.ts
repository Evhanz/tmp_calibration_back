import User from "../entities/User";
import Decrypt from "../services/Decrypt"

class UserRepository  {

    static findOne = async (username:string) => {
        let response: any =  await User.findOne({
        where: {
          usuario: username
        }
      });
        console.log(response);
        return response;
    }

    static checkIfUnencryptedPasswordIsValid =  (passInput : string, passUser : string)=>{
        let decrypt = new Decrypt();
        if(decrypt.asciinom(decrypt.decode(passUser)) == passInput){
            return true;
        } 
        return false;
    }
};

export default UserRepository;