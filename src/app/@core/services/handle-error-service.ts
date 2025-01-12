import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
// import { AuthService } from "./auth.service";

@Injectable({
    providedIn: "root"
})
export class HandleErrorService {

    constructor(
        // private authService: AuthService,
         private toastrService: ToastrService
    ) { }

    // Handling HTTP Errors using Toastr
    public handleError(error: any) {

        if (error instanceof HttpResponse) {
            const body = error.body;
            if (body?.isError && body?.message) {
                // this.toastrService.error(body.message);
            }
        }

        if (error instanceof HttpErrorResponse) {
            const errorResponse = error.error;
            if (errorResponse?.detail) {
                if (error.url?.includes('i18n')) {
                    return
                } else {
                    if (typeof errorResponse !== 'object' || errorResponse === null) {
                        
                        return;
                    }
                    const { status, detail, path, title } = errorResponse;

                    const htmlContent = `
                    ${status ? `<p class="text-white mt-3">${status}</p>` : ''}
                    ${detail ? `<p class="text-white">${detail}</p>` : ''}
                    ${path ? `<p class="text-white">${path}</p>` : ''}
                `;
                    // Call toastrService.error() with the constructed HTML content
                this.toastrService.error(htmlContent, title, { enableHtml: true });
                }
            } else if (error?.message && error.status == 400 || error.status == 500) {
                const { status, name, message } = error;
                const htmlContent = `
                ${status ? `<p class="text-white mt-3">${status}</p>` : ''}
                ${message ? `<p class="text-white">${message}</p>` : ''}
            `;
                // Call toastrService.error() with the constructed HTML content
             this.toastrService.error(htmlContent, name, { enableHtml: true });
            }

            if (error.status === 401) {
                // this.authService.logout();
            }

        }
    }
}
