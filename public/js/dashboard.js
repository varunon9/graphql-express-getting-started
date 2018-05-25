/**
 * @author Varun Kumar<varunon9@gmail.com>
 * https://github.com/varunon9
 */

'use-strict';

function getUserProfile(callback) {
    var params = {};
    globals.ajaxService.getUserProfile(params, function successCallback(user) {
        callback(user);
    }, function errorCallback(message) {
        globals.showToastMessage('Error', message, 'error');
    });
}

$(document).ready(function() {
   
    $('.ui.checkbox').checkbox();
    var params = {}; // parameters for signup

    $('#updateProfileButton').on('click', function() {
        params.name = $('#myProfile input[name="name"]').val();
        params.mobile = $('#myProfile input[name="mobile"]').val();
        params.dob = $('#myProfile input[name="dob"]').val();
        params.gender = $('#myProfile input[name="gender"]:checked').val();

    	$('#updateProfileButton').addClass('loading');
        globals.ajaxService.updateUserProfile(params, function successCallback() {
            $('#updateProfileButton').removeClass('loading');
            globals.showToastMessage('Success', 'Profile Updated', 'success');
        }, function errorCallback(message) {
            globals.showToastMessage('Error', message, 'error');
            $('#updateProfileButton').removeClass('loading');
        });
    });

    getUserProfile(function(user) {
        // populate my profile
        $('#myProfile input[name="mobile"]').val(user.mobile);
        $('#myProfile input[name="name"]').val(user.name);
        $('#myProfile input[name="email"]').val(user.email);
        $('#myProfile input[name="dob"]').val(globals.formatDate(user.dob));

        $('#myProfile input[name="gender"]').removeAttr('checked');
        $('#myProfile input[name="gender"][value="' + user.gender + '"]')
                .attr('checked', 'checked').click();
    });

});

(function() {
    globals.makeGraphQLRequest('graphql', {
        query: `query($email: String!) {
            profile(email: $email) {
                id mobile name email dob gender
            }
        }`,
        variables: {
            email: 'varunon9@gmail.com'
        }
    }, function successCallback(response) {
        console.log(response);
    });

    globals.makeGraphQLRequest('graphql', {
        query: `mutation($email: String!) {
            updateUser(email: $email) {
                email
            }
        }`,
        variables: {
            email: 'varunon9@gmail.com'
        }
    }, function successCallback(response) {
        console.log(response);
    });
}());

/*
const mutation = gql`mutation ($content: String){
  addPost(name: "Mary", title: "No title", content: $content) {
    name
    title
    content
  }
}`;
*/