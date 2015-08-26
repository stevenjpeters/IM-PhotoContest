/*jslint browser: true*/
/*global $, jQuery, alert*/

$(document).ready(function () {
    'use strict';
    
    var step = 1,
        step_1 = ["Status"],
        step_2 = ["Name", "LastName", "Address", "City", "State", "ZIP", "Phone", "Email"],
        step_3 = ["CharityName", "CharityAddress", "CharityCity", "CharityZip", "CharityPhone", "CharityState", "CharityDisclaimer", "CharityRequirements"],
        step_4_1 = ["PhotoTitle1", "PhotoStory1", "Photo1", "PhotoRequirements"],
        step_4_2 = ["PhotoTitle2", "PhotoStory2", "Photo2"],
        visited = 0,
        image = Math.floor((Math.random() * 12) + 1),
        title = ["Big Presentation Day!", "The Aquarium Adventure", "Sisters", "America's National Symbol of Freedom", "Rainbow from Beyond", "Beauty In The Rough", "New Summer Friends", "Peaceful Summer", "United Family for the First Time", "Butterflies' Buffet", "Ready to Go in the Show Ring", "Angel in the Clematis"],
        author = ["Shannon Dandridge, Policyowner", "Connie Johnson, Employee", "Fred Wilmsen, Agent", "Brenda Ritter, Policyowner", "Andrew Strathman, Agent", "Jim Herrmann, Agent", "Dana Allen, Employee", "Erica Utley, Employee", "David Pietrzyk, Agent", "Sharon Talarico, Agent", "Mike Choate, Policyowner", "Sandi Landers, Retiree"];
    
    function stepDots(x, y) {
        var currentStep = x,
            lastStep = y;
        $('.step-dot.' + currentStep).addClass('filled');
        $('.step-dot.' + lastStep).removeClass('filled');
    }
    
    function fadeLast(i, val) {
        $('#Ctl_' + val + '_3015').parent().fadeOut(500);
    }
    
    function fadeNext(i, val) {
        $('#Ctl_' + val + '_3015').parent().delay(750).fadeIn();
    }
    
    function formResize(z) {
        var formHeight = z;
        $('.Theme_Normal_Bottom').delay(500).animate({padding: '15px', height: z}, 500);
    }
    
    
    
   
    $('<span class="glyphicons glyph-circle-arrow-right" id="next"><span class="btnTxt">&nbsp;NEXT</span></span>').insertAfter('.form_submit').hide();
    $('<span class="glyphicons glyph-circle-arrow-left" id="prev"></span>').insertAfter('.form_submit').hide();
    $('.Theme_Normal_Bottom').prepend('<h2 href="#" id="title" style="color: white">To enter your photo, click on your current status with Illinois Mutual.</h2>');
    $('<div class="step-dots"><div class="step-dot first"></div><div class="step-dot second"></div><div class="step-dot third"></div><div class="step-dot fourth"></div><div class="clearfix"></div></div>').insertBefore('#title');
    $('#title').hide();
    $('.SubmitButton3015').hide();
    formResize('450px');
    $('<span class="glyphicons glyph-circle-plus" id="addPhoto"><span class="btnTxt">&nbsp;ADD ANOTHER PHOTO</span></span>').insertAfter('.form_submit').hide();
    $('#title').fadeIn();
    $('#Ctl_CharityDisclaimer_3015').text('If you do not include charity information or the charity indicated does not comply with the requirements listed below, the donation will automatically be made to your local United Way. Once your entry is submitted, we cannot accept changes to your charity of choice.');
    $('#Ctl_CharityRequirements_3015').html('The charity named must be a 501(c)(3) organization, human care agency, cultural organization or an accredited institution of higher learning. For exclusions and restrictions, please consult our <a href="http://forms.illinoismutual.net/IMLCharitableDonationGuidelines.pdf" target="_blank" style="color: #FFFFFF; border-bottom: 1px dotted #FFFFFF;">Charitable Donations Guidelines</a>. Printed material describing the organization may be required. If you do not include charity information or the charity indicated does not comply with the requirements listed below, the donation will automatically be made to your local United Way. Once your entry is submitted, we cannot accept changes to your charity of choice.');
    $('#Ctl_PhotoRequirements_3015').html('<p>Acceptable File Formats: .jpg, .png, .tif, .pdf, and .eps</p><p>Scanned Photos: Scan at 300dpi.</p><p>Submitted photos cannot exceed 20MB in size.</p>');
    $('label[for="Ctl_Status_3015_0"]').prepend('<i class="formIcon glyphicons glyph-tie"></i><br />');
    $('label[for="Ctl_Status_3015_2"]').prepend('<i class="formIcon glyphicons glyph-briefcase"></i><br />');
    $('label[for="Ctl_Status_3015_1"]').prepend('<i class="formIcon glyphicons glyph-notes"></i><br />');
    $('label[for="Ctl_Status_3015_3"]').prepend('<i class="formIcon glyphicons glyph-golf-course"></i><br />');
    $('#next').hide();
    
    stepDots('first', 'none');
    
    $('#next').on('click', function () {
        step += 1;
        if (step === 3) {
            $.each(step_2, fadeLast);
            $.each(step_3, fadeNext);
            $('#title').text('Charity Information');
            stepDots('third', 'second');
            formResize('700px');
        } else if (step === 4) {
            $.each(step_3, fadeLast);
            $('#next').fadeOut();
            $('.SubmitButton3015').fadeIn();
            $('#title').text('Upload Your Photo');
            stepDots('fourth', 'third');
            if (visited === 0) {
                $.each(step_4_1, fadeNext);
                $('#addPhoto').fadeIn();
                formResize('520px');
            } else if (visited === 1) {
                $.each(step_4_1, fadeNext);
                $.each(step_4_2, fadeNext);
                formResize('820px');
            }
        }
    });
    
    $('label').on('click', function () {
        if ($('input[name="Ctl$Status$3015"]').is(':checked')) {
            step += 1;
            if (step === 2) {
                $.each(step_1, fadeLast);
                $.each(step_2, fadeNext);
                $('#title').text('Your Information').delay(500).fadeIn();
                $('#prev').fadeIn();
                stepDots('second', 'first');
                $('#next').fadeIn();
            }
        }
    });
    
    $('#addPhoto').on('click', function () {
        $.each(step_4_2, fadeNext);
        formResize('820px');
        $('#addPhoto').hide();
        visited = 1;
    });
    
    $('#prev').on('click', function () {
        step -= 1;
        if (step === 2) {
            $.each(step_3, fadeLast);
            $.each(step_2, fadeNext);
            stepDots('second', 'third');
            $('#prev').fadeIn();
            $('#title').text('Your Information').delay(500).fadeIn();
            formResize('450px');
        } else if (step === 3) {
            $.each(step_4_1, fadeLast);
            $.each(step_4_2, fadeLast);
            $.each(step_3, fadeNext);
            stepDots('third', 'fourth');
            $('#addPhoto').fadeOut();
            $('#next').fadeIn();
            $('.SubmitButton3015').fadeOut();
            $('#title').text('Charity Information').delay(500).fadeIn();
            formResize('700px');
        } else if (step === 1) {
            $.each(step_2, fadeLast);
            $.each(step_1, fadeNext);
            $('#prev, #next').fadeOut();
            $('#title').text('To enter your photo, click on your current status with Illinois Mutual.').delay(500).fadeIn();
            stepDots('first', 'second');
        }
    });
    
    if (step !== 2) {
        $.each(step_2, function (i, val) {
            $('#Ctl_' + val + '_3015').parent().hide();
        });
        $.each(step_3, function (i, val) {
            $('#Ctl_' + val + '_3015').parent().hide();
        });
        $.each(step_4_1, function (i, val) {
            $('#Ctl_' + val + '_3015').parent().hide();
        });
        $.each(step_4_2, function (i, val) {
            $('#Ctl_' + val + '_3015').parent().hide();
        });
    }
    
    $('#PhotoFrame').html('<img class="img-responsive" src="/portals/31/WinnerImages/full_' + image + '.jpg"><h4>' + title[image - 1] + '</h4><p>' + author[image - 1] + '</p>');
    
    if ($(window).width() < 641) {
        $('.headerImg').attr("src", "/portals/31/Images/Slider%20Images/PhotoContestSlide-Mobile.jpg");
    } else {
        $('.headerImg').attr("src", "/portals/31/Images/Slider%20Images/PhotoContestSlide.jpg");
    }
    
    if ($(window).width() > 767) {
        $('#PhotoFrame').delay(500).fadeIn();
    } else {
        $('#PhotoFrame').fadeOut(100);
    }
    
    $(window).resize(function () {
        if ($(window).width() < 641) {
            $('.headerImg').attr("src", "/portals/31/Images/Slider%20Images/PhotoContestSlide-Mobile.jpg");
        } else {
            $('.headerImg').attr("src", "/portals/31/Images/Slider%20Images/PhotoContestSlide.jpg");
        }
        
        if ($(window).width() > 767) {
            $('#PhotoFrame').delay(500).fadeIn();
        } else {
            $('#PhotoFrame').fadeOut(100);
        }
    });
    
});