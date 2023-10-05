var form = document.getElementById("myForm");
var phoneInput = document.getElementById("phone");
var emailInput = document.getElementById("email");
var displayPhoneInput = document.getElementById("displayPhone");
var displayEmailInput = document.getElementById("displayEmail");
var displayCityInput = document.getElementById("displayCity");
var displayDistrictInput = document.getElementById("displayDistrict");
var districtSelect = document.getElementById("district");

// Định nghĩa biểu thức chính quy cho kiểm tra số điện thoại
var phoneRegex = /^\d{10}$/;

// Định nghĩa biểu thức chính quy cho kiểm tra email
var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

fetch("./db.json")
  .then((response) => response.json())
  .then((data) => {
    var districtOptions = data;
    // Xử lý sự kiện khi tỉnh / thành phố thay đổi
    document.getElementById("city").addEventListener("change", function () {
      var selectedCity = this.value;
      var districts = districtOptions[selectedCity] || [];

      districtSelect.innerHTML =
        '<option value="">-- Chọn quận / huyện --</option>';

      if (districts.length) {
        districts.forEach(function (district) {
          var option = document.createElement("option");
          option.value = district;
          option.textContent = district;
          districtSelect.appendChild(option);
        });
      }
    });

    // validate email và sđt
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var isFormValid = true;

      if (!phoneRegex.test(phoneInput.value)) {
        window.alert(
          "Số điện thoại phải là dãy số liên tiếp và tối đa 10 kí tự, không chứa kí tự đặc biệt!"
        );
        isFormValid = false;
      } else if (!emailRegex.test(emailInput.value)) {
        window.alert("Email không đúng định dạng!");
        isFormValid = false;
      }

      if (isFormValid) {
        var formData = new FormData(form);
        var data = {};

        for (var pair of formData.entries()) {
          data[pair[0]] = pair[1];
        }

        displayPhoneInput.value = data.phone;
        displayEmailInput.value = data.email;
        displayCityInput.value = data.city;
        displayDistrictInput.value = data.district;

        form.reset();
        setTimeout(function () {
          window.alert("Form bạn gửi đã thành công!");
        }, 100);
      }
    });
  })
  .catch((error) => {
    console.error("ahihi lỗi data rồi", error);
  });
