#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <sys/wait.h>

#define MAX_INPUT_LENGTH 1024

int main() {
    char input[MAX_INPUT_LENGTH];
    char *args[MAX_INPUT_LENGTH];
    int status;

    while (1) {
        printf("> ");
        fgets(input, MAX_INPUT_LENGTH, stdin);

        // Remove newline character from input
        input[strcspn(input, "\n")] = 0;

        // Convertimos los input en token para poder pasarlos al execvp
        char *token = strtok(input, " ");
        int i = 0;
        while (token != NULL) {
            args[i] = token;
            token = strtok(NULL, " ");
            i++;
        }
        args[i] = NULL;

        // Hacemos un fork del hijo
        pid_t pid = fork();
        if (pid == 0) {
            // Child process
            execvp(args[0], args);
            printf("Command not found\n");
            exit(1);
        } else if (pid < 0) {
            // Fork fallido
            printf("Fork failed\n");
            exit(1);
        } else {
            // Proceso padre
            waitpid(pid, &status, 0);
        }
    }

    return 0;
}
