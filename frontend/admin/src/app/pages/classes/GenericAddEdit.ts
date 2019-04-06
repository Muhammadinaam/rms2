import { OnInit, Injector } from "@angular/core";
import { DataServiceInterface } from "./DataServiceInterface";
import { ActivatedRoute, Router } from "@angular/router";
import { repeat } from "rxjs/operators";
import { HttpClient, HttpHandler, HttpXhrBackend, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BaseEndPointService } from "../../services/base-end-point.service";
import { AuthInterceptorService } from "../../auth/interceptors/auth-interceptor.service";

export class GenericAddEdit implements OnInit
{
    public activatedRouteGeneric: ActivatedRoute;
    public modalService: DataServiceInterface;
    public routerGeneric: Router;
    public data:any;
    public editingId = null;
    public imagesFolder = 'misc_images';
    public submitting = false;
    public redirectPathAfterAddEdit = '';

    constructor(
        _activatedRoute: ActivatedRoute, 
        _modalService: DataServiceInterface,
        private httpClient: HttpClient,
        _router: Router) 
    {
        this.activatedRouteGeneric = _activatedRoute;
        this.modalService = _modalService;
        this.routerGeneric = _router;
    }
    
    ngOnInit(): void {
        this.activatedRouteGeneric.params.subscribe( params => {
            if(params.id) {
                this.editingId = params.id;

                this.modalService.edit(this.editingId)
                    .subscribe(resp => {
                        this.data = resp
                        this.afterModalLoad();
                    });
            }
        });
    }

    afterModalLoad()
    {

    }

    onSubmit()
    {
        this.uploadImagesAndSubmitData();
    }

    submitData()
    {
        var data = this.data;

        var source;
        if(this.editingId == null)
        {
            source = this.modalService.insert(data);
        }
        else
        {
            source = this.modalService.update(data, this.editingId);
        }

        source.subscribe(response => {
            if(response.success)
            {
                alert('Saved Successfully');
                this.editingId = response.id;

                if(this.redirectPathAfterAddEdit != '')
                {
                    this.routerGeneric.navigate([this.redirectPathAfterAddEdit]);
                }
            }    
            else
            {
                alert('Error Occurred.' + response.message);
            }
        },
        error => {
            if(error.status == 422)
            {
                let validationMessages = error.error.errors;

                let errorMessage = '';
                
                Object.keys(validationMessages).forEach(key =>{
                    validationMessages[key].forEach(msg => {
                        errorMessage += '- ' + msg + '\n';
                    })
                })

                alert(errorMessage);

            }else
            {
                alert(error.message);
            }
        }).add(() => this.submitting = false);
    }

    uploadImagesAndSubmitData(): any {

        this.submitting = true;
        
        var newData = {};

        var keys = Object.keys(this.data);
        var counter = 0;
        var filesCount = 0;

        keys.forEach(key => {
            if(this.data[key] instanceof File)
            {
                filesCount++;
            }
        });

        if(filesCount == 0)
        {
            this.submitData();
            return;
        }

        keys.forEach(key => {
            if(this.data[key] instanceof File)
            {
                var fd = new FormData();
                fd.append('image', this.data[key]);
                fd.append('folder', this.imagesFolder);
                this.httpClient.post(BaseEndPointService.getBaseEndPoint() + '/api/store-image', fd)
                    .subscribe(resp => {
                        counter++;
                        newData[key] = resp['file_with_path'];

                        console.log(counter + '--' + filesCount);
                        if(counter == filesCount)
                        {
                            this.submitData();
                        }
                    });
            }
            else
            {
                newData[key] = this.data[key];
            }

        });
        this.data = newData;
        console.log(this.data);
    }

    showImage(event: Event, imageUrl, image): void {
        const target= event.target as HTMLInputElement;
        if (target.files && target.files[0]) {
            const file = target.files[0];
            this.data[image] = file;

            const reader = new FileReader();
            reader.onload = e => this[imageUrl] = reader.result;

            reader.readAsDataURL(file);
        }
    }
}