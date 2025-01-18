 
var api_url = 'https://script.google.com/macros/s/AKfycbw5SLuFrFqlWYGpf_hLBUeFFD_pvlim3Xz67tWH8WYrM1hoEBgORSVdVQ5dGk-Ydi3-kw/exec'; //生成したAPIのURLを指定
 
fetch(api_url)
.then(function (fetch_data) {
  return fetch_data.json();
})
.then(function (json) {
  for (var i in json) {
    // jsonの要素数だけ回す
    var base_element = document.getElementsByClassName('product-item js-based'); //元となるHTMLの要素を指定
    var clone_element = base_element[0].cloneNode(true); //元となるHTMLの要素を複製
    clone_element.classList.remove('js-based'); //複製した要素からクラス削除
 
    clone_element.querySelector('.initial').textContent = json[i].initial; //テキストに取得した商品名を設定
    clone_element.querySelector('.data1').textContent = json[i].data1; //テキストに取得した商品名を設定
    clone_element.querySelector('.data2').textContent = json[i].data2; //テキストに取得した商品名を設定
    
    if (clone_element.tagName === 'A') {
        let textContent = clone_element.textContent; // リンクのテキストを取得
        clone_element = document.createTextNode(textContent); // テキストノードに変換
    }

    base_element[0].parentNode.appendChild(clone_element); //元となるHTMLの要素の後ろに複製した要素を追加
  }
});