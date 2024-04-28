/* This file specifies the settings for the Title-Page and Closing-Page scenes.
 * If this file is ever corrupted there is a default settings backup located in
 * the backup folder.
 *
 * I've made an attempt to document what the settings below do, if there are
 * any questions contact Mark Whiting for more information.
 */

var settings = {
  /* The <startHour> and <startMinute> variables specify the start time of
   * the service. The time is specified using the 24-hour time format.
   *
   * <startHour> has a valid range of 0-23.
   * <startMinute> has a valid range of 0-59.
   */
  "startHour" : 09,
  "startMinute" : 00,

  /* The <title>, <passage>, and <passageReference> specify the main text that
   * appears on the Title page. All three of these variables are strings, if
   * you want to leave one or more empty you still need to specify an empty
   * string with "". If you want to include a quotation mark " in the displayed
   * string you need to escape it with a backslash.
   *
   *    i.e. "Here's a single quote \" embedded in the string"
   *
   * You may also include some limited HTML tags in the string to format things.
   *
   *    For Example:
   *        <i>italics</i>
   *        <b>bold</b>
   *        you can use <br> to insert a line break
   *
   * <title> is the main title/theme of the service, usually the theme of the
   * sermon is used.
   *
   * <passage> is usually the bible passage that's printed on the front of the
   * bulletin. If a phrase or something other than a bible passage is on the
   * front of the bulletin that may be place here.
   *
   * <passageReference> is the reference for the bible passage, i.e. "John
   * 3:16". If <passage> is not an actual bible passage this may be left blank.
   */
  "title" : "Lorem Ipsum",
  "passage" : "Lorem Ipsum",
  "passageReference" : "Lorem Ipsum",

  /* The <image> variable specifies the file path to the main image displayed
   * on the Title and Closing pages. The path needs to be specified relative to
   * the folder this settings.js file is in. The path should include the full
   * image name and extension. Any image type supported by the Chrome browser
   * is supported.
   */
  "image" : "title-images/example.jpg",

  /* The <qrCodeUrl> variable specifies the URL that the QR code links to. */
  "qrCodeUrl" : "https://messiahhalescorners.com/",

  /* The following two variables probably don't ever need to be edited. They
   * control the messaging behavior at the start of a service. There are three
   * different messages that can be displayed, when these messages are
   * displayed depends on the start time specified above and the
   * <countdownMinutes> and <startingMinutes> variables.
   *
   * <startTime> - <countdownMinutes> -> <startTime> = "Our service will start in <countdown>"
   * <startTime> -> <startTime> + <startingMinutes> = "Our service will start momentarily..."
   * <startTime> + <startingMinutes> -> <startTime> - <countdownMinutes> = "Our service will start at <startTime>"
   *
   * For example, if the start time is 8:00 am, <countdownMinutes> is 5, and
   * <startingMinutes> is 30.
   *
   * From 7:55 am to 8:00 am, it will display "Our service will start in <countdown>"
   * From 8:00 am until 8:30 am, it will display "Our service will start momentarily..."
   * At all other times, it will display "Our service will start at 8:00 AM"
   */

  /* The <countdownMinutes> variable defines how many minutes the Title Page
   * will countdown before the starting time.
   */
  "countdownMinutes" : 15,

  /* The <startingMinutes> variable specifies how long after the start time the
   * "Our service will start momentarily..." message will be shown.
   */
  "startingMinutes" : 30
}
