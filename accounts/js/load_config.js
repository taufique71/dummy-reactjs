(function () {
    $(document).ready(function () {
        $.get('../config.yml')
        .done(function (data) {
            config = jsyaml.load(data);
      });
    });
}());

