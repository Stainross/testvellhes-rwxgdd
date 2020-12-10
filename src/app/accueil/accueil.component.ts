import { AfterViewInit, Component, OnInit } from "@angular/core";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Product } from "./accueil.product.model";
//import * as Quagga from "quagga";
@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) {}
}

@Component({
  selector: "app-accueil",
  templateUrl: "./accueil.component.html",
  styleUrls: ["./accueil.component.css"]
})
export class AccueilComponent {
  url = "https://world.openfoodfacts.org/api/v0/product/";
  product = new Product();
  name: "";
  novaGroup: "";
  imageUrl: "";
  nutriScore: "";
  allergens: "";

  title = "app-projettut";
  errorMessage: string;

  //codeB.codeResult.code
  test = this.setInformations("3421370012702");
  constructor(private httpClient: HttpClient) {}
  async getProductData(barcode: string) {
    const data = await this.httpClient
      .get(this.url + barcode + ".json", {
        responseType: "json"
      })
      .toPromise();
    return (this.product = {
      name: data["product"]["product_name"],
      novaGroup: data["product"]["nova_group"],
      imageUrl: data["product"]["selected_images"]["front"]["thumb"]["fr"],
      nutriScore: data["product"]["nutriscore_grade"],
      allergens: data["product"]["allergens"]
    });
  }
  setInformations(barcode: string) {
    Promise.resolve(this.getProductData(barcode)).then(value => {
      this.name = value.name;
      this.novaGroup = value.novaGroup;
      this.imageUrl = value.imageUrl;
      this.nutriScore = value.nutriScore;
      this.allergens=value.allergens;
    });
  }
}

/*ngAfterViewInit(): void {
    setTimeout(() => {
      Quagga.init(
        {
          inputStream: {
            constraints: {
              facingMode: "environment" // restrict camera type
            },
            area: {
              // defines rectangle of the detection
              top: "40%", // top offset
              right: "0%", // right offset
              left: "0%", // left offset
              bottom: "40%" // bottom offset
            }
          },
          decoder: {
            readers: ["ean_reader"], // restrict code types
            debug: {
              drawBoundingBox: true,
              showFrequency: true,
              drawScanline: true,
              showPattern: true,
              showCanvas: true,
              showPatches: true,
              showFoundPatches: true,
              showSkeleton: true,
              showLabels: true,
              showPatchLabels: true,
              showRemainingPatchLabels: true,
              boxFromPatches: {
                showTransformed: true,
                showTransformedBox: true,
                showBB: true
              }
            }
          }
        },
        (err: any) => {
          if (err) {
            this.errorMessage = `Probleme initialisation QuaggaJS : ${err}`;
          } else {
            Quagga.start();
            Quagga.onDetected(codeB => {
              this.setInformations(codeB.codeResult.code);
            });
          }
        }
      );
    }, 2000);
  }*/
