// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Users {

    address owner;
    mapping(address=>address) public user_to_sc;
    mapping(address=>bool) public isUser;
    string[] posts;

    constructor() {
        owner = msg.sender;
    }

    function add_user(address user_sc_address) public {
        require(isUser[msg.sender]==false, "You are already registered");
        user_to_sc[msg.sender] = user_sc_address;
        isUser[msg.sender]=true;
    }

    function checkUser() public view returns(bool) {
        return isUser[msg.sender];
    }

    function get_sc() public view returns (address) {
        require(isUser[msg.sender]==true, "You are not a registered user.");
        return user_to_sc[msg.sender];
    }

    function add_post(string memory hash) public {
        require(isUser[msg.sender]==true, "You are not a registered user.");
        posts.push(hash);
    } 

    function get_all_posts() public view returns(string[] memory) {
        require(isUser[msg.sender]==true, "You are not a registered user.");
        return posts;
    }

}