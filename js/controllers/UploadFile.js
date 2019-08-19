BadManAdmin
    .controller('FileUploadController', ['$scope', 'FileUploader', function ($scope, FileUploader) {
        // Uploader Plugin Code
        debugger;
        var uploader = $scope.uploader = new FileUploader({
            url: window.location.protocol + '//' + window.location.host + window.location.pathname + '/api/Upload/UploadFile'
        });

        // FILTERS

        uploader.filters.push({
            name: 'extensionFilter',
            fn: function (item, options) {
                var filename = item.name;
                var extension = filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();
                if (extension == "pdf" || extension == "doc" || extension == "docx" || extension == "rtf" || extension == "png" || extension == "jpg")
                    return true;
                else {
                    alert('文件格式无效。请选择与PDF/ DOC / DOCX或RTF格式的文件，然后再试一次.');
                    return false;
                }
            }
        });

        uploader.filters.push({
            name: 'sizeFilter',
            fn: function (item, options) {
                var fileSize = item.size;
                fileSize = parseInt(fileSize) / (1024 * 1024);
                if (fileSize <= 5)
                    return true;
                else {
                    alert('选定的文件超过了5MB的文件大小限制。请选择一个新的文件，然后再试一次。');
                    return false;
                }
            }
        });

        uploader.filters.push({
            name: 'itemResetFilter',
            fn: function (item, options) {
                if (this.queue.length < 5)
                    return true;
                else {
                    alert('您已经超过了上传文件的限制。');
                    return false;
                }
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function (item, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function (fileItem) {
            //alert('Files ready for upload.');
        };

        uploader.onSuccessItem = function (fileItem, response, status, headers) {
            $scope.uploader.queue = [];
            $scope.uploader.progress = 0;
            alert('所选的文件已成功上传。');
        };
        uploader.onErrorItem = function (fileItem, response, status, headers) {
            alert('我们无法上传您的文件。 请再试一次。');
        };
        uploader.onCancelItem = function (fileItem, response, status, headers) {
            alert('文件上传已被取消。');
        };

        uploader.onAfterAddingAll = function (addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function (item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function (fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function (progress) {
            console.info('onProgressAll', progress);
        };

        uploader.onCompleteItem = function (fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function () {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);
    }]);