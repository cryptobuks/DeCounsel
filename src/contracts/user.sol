// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract User {

    address owner;
    string public_key;
    string private_key;
    address[] public contacts;
    mapping(address => bool) public isContact; 
    mapping(address=>string) public contact_encrypt_key;
    mapping(address=>string) public contact_decrypt_key;
    //this mongo id object stores the hash of that chat data between us and our contact
    mapping(address=>string) public mongo_id; 

    constructor() {
        owner = msg.sender;
    }

    function set_keys(string memory key1, string memory key2) public {
        require(owner==msg.sender);
        public_key = key1;
        private_key = key2;
    }

    function get_pub_key() public view returns(string memory) {
        require(msg.sender == owner);
        return public_key;
    }

    function get_priv_key() public view returns(string memory) {
        require(msg.sender == owner);
        return private_key;
    }

    function add_contact(address contact, string memory key1, string memory key2, string memory mongoid) public {
        require(msg.sender == owner);
        require(isContact[contact]==false, "This address is already added your connection.");
        contacts.push(contact);
        contact_encrypt_key[contact] = key1;
        contact_decrypt_key[contact] = key2;
        isContact[contact] =  true;
        mongo_id[contact] = mongoid;
    }

    function get_contacts() public view returns(address[] memory) {
        require(msg.sender == owner);
        return contacts;
    }

    function get_contact_encryption_key(address contact) public view returns(string memory) {
        require(msg.sender == owner);
        return contact_encrypt_key[contact];
    }

    function get_contact_decryption_key(address contact) public view returns(string memory) {
        require(msg.sender == owner);
        return contact_decrypt_key[contact];
    }

    function get_chat_mongid(address contact) public view returns (string memory) {
        return mongo_id[contact];
    }

}