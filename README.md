<h2>致敬 LINE 聊天室(行動版)</h2>
  <h3>實現功能</h3>
  <ul>
    <li>
      <h4>使用 mack api</h4>
    </li>
    <li>
      <h4><a href="https://mizuyang.github.io/line-chatroom/#/chatroomList" target="_blank">討論區</a></h4>
      <ul>
        <li>顯示每個討論區最新一則訊息的內容</li>
        <li>
          顯示每個討論區最新一則訊息的日期
          <ul>
            <li>若該日期為今天，則顯示該訊息發送的"時":"分"</li>
            <li>若該日期為昨天，則顯示"昨天"</li>
            <li>若該日期為前天，則顯示"前天"</li>
            <li>其餘日期則直接顯示該日期</li>
          </ul>
        </li>
        <li>使用computed篩選關鍵字搜尋討論區的名稱</li>
      </ul>
    </li>
    <li>
      <h4><a href="https://mizuyang.github.io/line-chatroom/#/chatroom" target="_blank">討論區內的聊天室(操作皆與LINE桌面版相同)</a></h4>
      <ul>
        <li>
          對話氣泡操作
          <ul>
            <li>
              手機版
              <p>點擊對話氣泡後判斷用戶是點擊 or 按住螢幕</p>
              <ul>
                <li>點擊螢幕：若該訊息有回覆的訊息對向，則跳轉過去該訊息，並記錄當下位置，顯示返回位置的按紐，讓用戶可以返回剛剛操作時的位置</li>
                <li>
                  按住螢幕0.2秒：顯示對話功能菜單
                  <ul>
                    <li>複製：點擊即可複製文字</li>
                    <li>回覆：點擊即出現要回覆的對話內容在下方，並可針對該對話進行回覆</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              桌機版
              <ul>
                <li>點擊左鍵：若該訊息有回覆的訊息對向，則跳轉過去該訊息，並記錄當下位置，顯示返回位置的按紐，讓用戶可以返回剛剛操作時的位置</li>
                <li>
                  點擊右鍵：顯示對話功能菜單
                  <ul>
                    <li>複製：點擊即可複製文字</li>
                    <li>回覆：點擊即出現要回覆的對話內容在下方，並可針對該對話進行回覆</li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          進聊天室的預設畫面
          <ul>
            <li>若有未讀訊息，會讓"以下尚未閱讀的訊息"顯示在畫面中間</li>
            <li>若無未讀訊息，則直接將畫面顯示在對話的最底部</li>
          </ul>
        </li>
        <li>
          <a href="https://www.figma.com/file/NyWoSh5Ck3Iw9dQem15O67/LINE-%E8%81%8A%E5%A4%A9%E5%AE%A4---%E5%88%A4%E6%96%B7%E6%98%AF%E5%90%A6%E5%B7%B2%E8%AE%80?type=design&node-id=0%3A1&t=NVE7wImFPtJSHRxx-1" target="_blank">判斷訊息已讀</a>
          (目前我是將已讀訊息變成綠色的文字, 方便檢視)
        </li>
        <li>判斷畫面停止後才判斷"可視畫面"中的訊息是否已讀(只要可視畫面下面高度以上的所有訊息皆是已讀)</li>
        <li>使用"節流"降低scroll事件觸發的次數</li>
        <li>
          回覆訊息
          <ul>
            <li>可回覆訊息</li>
            <li>點選回覆訊息的內容，可直接到底該訊息的位置(錨點)，並出現左右晃動的動畫提示是該訊息</li>
            <li>點選回覆訊息的對話氣泡，也可以直接抵達該訊息的位置，並在點選訊息位置跳轉過去後，下方也會出現"挑至先前的訊息"按鈕，點了就可以回到一開始的位置</li>
          </ul>
        </li>
        <li>若訊息文字超過200字，即使用文字截斷，只顯示部分文字，並出現"顯示全部內容"按鈕，點選後會出現彈跳視窗來顯示所有文字</li>
        <li>
          emoji 表情符號
          <ul>
            <li>點擊開啟emoji菜單的按紐，會顯示emoji清單、自動將最後在文字輸入框的光標帶上去，讓用戶知道目前按emoji會加入到文字中的何處，方便用戶輸入(若無最後一次的光標位置，則將光標放到最後面)</li>
            <li>emoji菜單開啟後，點擊空白處會關閉emoji菜單</li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>