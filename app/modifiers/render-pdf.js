import Modifier from 'ember-modifier';
import pdfjsLib from 'pdfjs-dist/webpack';

pdfjsLib.GlobalWorkerOptions.workerSrc = "/assets/pdf.worker.bundle.js";

export default class RenderPdfModifier extends Modifier {
  async displayPDF(url) {
    let doc = await pdfjsLib.getDocument(url).promise;
    let pdfPage = await doc.getPage(1);

    var viewport = pdfPage.getViewport({ scale: 1.0 });
    var canvas = this.element;
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    var ctx = canvas.getContext("2d");
    await pdfPage.render({
      canvasContext: ctx,
      viewport: viewport,
    }).promise;
  }

  didReceiveArguments() {
    this.displayPDF(this.args.named.url);
  }
}
