const spawn = require( 'child_process' ).spawn,
      fs = require( 'fs-extra' ),
      path = require( 'path' );

const buildParameters = ( output, file, pattern ) => {
    return params = [ 
        '-jar', path.resolve( __dirname, 'jpexs/ffdec.jar'),
        '-selectclass',  pattern,
        '-export', 'script',
        path.join(path.dirname(__dirname), output), file
    ];
}

module.exports = function(output, file, pattern){

    var exec = spawn( 'java', buildParameters(output, file, pattern) );

    var outputMsg = '';
    var errMsg = '';

    exec.stdout.on( 'data', ( data ) => {
        var content = data.toString( 'utf8' );
        outputMsg += content;
        console.log(content);
    } );

    exec.stderr.on( 'data', ( data ) => {
        const error = data.toString( 'utf8' );

        errMsg += error;
    } );

    exec.on('close', () => {
        if(errMsg === '') {
            fs.copy(path.join(path.dirname(__dirname), output, 'scripts', 'com', 'ankamagames', 'dofus', 'network'), path.join(__dirname, output));
        }
        else console.error(errMsg);
    });

}

    