/**
 * @author Varun Kumar<varunon9@gmail.com>
 * https://github.com/varunon9
 */

'use-strict';

$(document).ready(function() {
   
    $('.ui.checkbox').checkbox();
    var params = {}; // parameters for signup

    $('#updateProfileButton').on('click', function() {
        params.name = $('#myProfile input[name="name"]').val();
        params.mobile = $('#myProfile input[name="mobile"]').val();
        params.dob = $('#myProfile input[name="dob"]').val();
        params.gender = $('#myProfile input[name="gender"]:checked').val();

    	$('#updateProfileButton').addClass('loading');

        globals.makeGraphQLRequest('graphql', {
            query: `mutation($params: JSON!) {
                updateProfile(params: $params) {
                    id mobile name email dob gender error
                }
            }`,
            variables: {
                params: params
            }
        }, function successCallback(data) {
            var user = data.updateProfile;
            if (user.error) {
                globals.showToastMessage('Error', user.error, 'error');
            } else {
                globals.showToastMessage('Success', 'Profile Updated', 'success');
            }
            $('#updateProfileButton').removeClass('loading');
        });
    });


    globals.makeGraphQLRequest('graphql', {
        query: `query {
            profile {
                id mobile name email dob gender error
            }
        }`
    }, function successCallback(data) {
        var user = data.profile;
        if (user.error) {
            globals.showToastMessage('Error', user.error, 'error');
        } else {
            // populate my profile
            $('#myProfile input[name="mobile"]').val(user.mobile);
            $('#myProfile input[name="name"]').val(user.name);
            $('#myProfile input[name="email"]').val(user.email);
            $('#myProfile input[name="dob"]').val(globals.formatDate(user.dob));

            $('#myProfile input[name="gender"]').removeAttr('checked');
            $('#myProfile input[name="gender"][value="' + user.gender + '"]')
                    .attr('checked', 'checked').click();
            }
    });

});