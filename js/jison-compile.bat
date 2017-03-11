for %%f in (*.jison) do (
     @echo off
     echo Compiling: %%~nf
     jison "%%~nf.jison"
)