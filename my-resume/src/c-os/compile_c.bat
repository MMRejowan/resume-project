@echo off
echo =======================================================
echo Compiling 01OS (resume_os.c) to WebAssembly using emcc
echo =======================================================
emcc resume_os.c -O3 -s WASM=1 -s EXPORTED_FUNCTIONS="['_os_init','_os_send_key','_os_get_frame','_os_get_active_screen','_os_get_selected_index']" -s EXPORTED_RUNTIME_METHODS="['ccall','cwrap','UTF8ToString']" -o resume_os.js
echo Compilation complete: resume_os.wasm and resume_os.js generated.
